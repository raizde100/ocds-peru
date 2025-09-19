const fs = require('fs-extra');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const path = require('path');

/**
 * OCDS Peru Validator
 * Validates OCDS data against the Peru-specific schema
 */
class OCDSPeruValidator {
  constructor() {
    this.ajv = new Ajv({ 
      allErrors: true,
      strict: false,
      validateFormats: true 
    });
    addFormats(this.ajv);
    this.schema = null;
    this.loadSchema();
  }

  /**
   * Load the OCDS Peru schema
   */
  loadSchema() {
    try {
      const schemaPath = path.join(__dirname, '../schema/ocds-peru-schema.json');
      this.schema = fs.readJsonSync(schemaPath);
      this.validate = this.ajv.compile(this.schema);
      console.log('✅ OCDS Peru schema loaded successfully');
    } catch (error) {
      console.error('❌ Error loading schema:', error.message);
      process.exit(1);
    }
  }

  /**
   * Validate OCDS data
   * @param {object} data - OCDS data to validate
   * @returns {object} - Validation result
   */
  validateData(data) {
    const isValid = this.validate(data);
    
    return {
      valid: isValid,
      errors: this.validate.errors || [],
      errorCount: this.validate.errors ? this.validate.errors.length : 0
    };
  }

  /**
   * Validate OCDS file
   * @param {string} filePath - Path to OCDS file
   * @returns {object} - Validation result
   */
  async validateFile(filePath) {
    try {
      console.log(`🔍 Validating file: ${filePath}`);
      const data = await fs.readJson(filePath);
      const result = this.validateData(data);
      
      if (result.valid) {
        console.log('✅ File is valid according to OCDS Peru schema');
      } else {
        console.log(`❌ File has ${result.errorCount} validation errors:`);
        result.errors.forEach((error, index) => {
          console.log(`  ${index + 1}. ${error.instancePath || 'root'}: ${error.message}`);
          if (error.data) {
            console.log(`     Data: ${JSON.stringify(error.data)}`);
          }
        });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Error reading file:', error.message);
      return {
        valid: false,
        errors: [{ message: `File read error: ${error.message}` }],
        errorCount: 1
      };
    }
  }

  /**
   * Validate all example files
   */
  async validateExamples() {
    const examplesDir = path.join(__dirname, '../examples');
    
    try {
      const files = await fs.readdir(examplesDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      console.log(`🔍 Found ${jsonFiles.length} JSON files in examples directory`);
      
      let validFiles = 0;
      let invalidFiles = 0;
      
      for (const file of jsonFiles) {
        const filePath = path.join(examplesDir, file);
        const result = await this.validateFile(filePath);
        
        if (result.valid) {
          validFiles++;
        } else {
          invalidFiles++;
        }
        console.log('');
      }
      
      console.log('📊 Summary:');
      console.log(`  ✅ Valid files: ${validFiles}`);
      console.log(`  ❌ Invalid files: ${invalidFiles}`);
      console.log(`  📁 Total files: ${jsonFiles.length}`);
      
      return {
        validFiles,
        invalidFiles,
        totalFiles: jsonFiles.length
      };
      
    } catch (error) {
      console.error('❌ Error reading examples directory:', error.message);
      return {
        validFiles: 0,
        invalidFiles: 0,
        totalFiles: 0
      };
    }
  }

  /**
   * Generate Peru-specific OCID
   * @param {string} year - Year of the procurement
   * @param {string} processType - Type of process (LP, AS, CP, etc.)
   * @param {string} sequentialNumber - Sequential number
   * @returns {string} - Generated OCID
   */
  generateOCID(year, processType, sequentialNumber) {
    // Format: ocds-213czf-PE-YYYY-TYPE-NNNNN
    // 213czf is the OCDS prefix for Peru
    const paddedNumber = sequentialNumber.toString().padStart(5, '0');
    return `ocds-213czf-PE-${year}-${processType}-${paddedNumber}`;
  }

  /**
   * Generate release ID
   * @param {string} ocid - OCID
   * @param {string} stage - Release stage (tender, award, contract, etc.)
   * @param {number} sequence - Sequence number for the stage
   * @returns {string} - Generated release ID
   */
  generateReleaseID(ocid, stage, sequence = 1) {
    const basePart = ocid.replace('ocds-213czf-', '');
    const seqPart = sequence > 1 ? `-${sequence}` : '';
    return `${basePart}-${stage}${seqPart}`;
  }
}

// CLI usage
if (require.main === module) {
  const validator = new OCDSPeruValidator();
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🔍 Validating all example files...');
    validator.validateExamples();
  } else if (args[0] === '--file' && args[1]) {
    validator.validateFile(args[1]);
  } else if (args[0] === '--generate-ocid' && args.length >= 4) {
    const [, year, processType, sequentialNumber] = args;
    const ocid = validator.generateOCID(year, processType, sequentialNumber);
    console.log(`Generated OCID: ${ocid}`);
  } else {
    console.log('Usage:');
    console.log('  node validate.js                           # Validate all examples');
    console.log('  node validate.js --file <path>             # Validate specific file');
    console.log('  node validate.js --generate-ocid <year> <type> <number>  # Generate OCID');
    console.log('');
    console.log('Examples:');
    console.log('  node validate.js --file ../examples/sample-procurement.json');
    console.log('  node validate.js --generate-ocid 2024 LP 1');
  }
}

module.exports = OCDSPeruValidator;