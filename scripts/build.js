const fs = require('fs-extra');
const path = require('path');

/**
 * Build script for OCDS Peru
 * Generates documentation and validates all data
 */

async function generateDocumentation() {
  console.log('📝 Generating documentation...');
  
  const docsDir = path.join(__dirname, '../docs');
  await fs.ensureDir(docsDir);
  
  // Generate README for the schema
  const schemaReadme = `# OCDS Peru Schema

Este esquema implementa el estándar OCDS (Open Contracting Data Standard) versión 1.1 adaptado específicamente para el sistema de contrataciones públicas del Perú.

## Características principales

- **Versión OCDS**: 1.1
- **Moneda por defecto**: PEN (Nuevo Sol Peruano)
- **Idioma por defecto**: Español (es)
- **País**: Perú
- **Identificadores soportados**: RUC, DNI, CE
- **Sistemas de clasificación**: CPV, UNSPSC

## Estructura del esquema

El esquema incluye las siguientes entidades principales:

### Release (Publicación)
- \`ocid\`: Identificador único del proceso de contratación
- \`id\`: Identificador único de la publicación
- \`date\`: Fecha de la publicación
- \`tag\`: Etiquetas que indican la etapa del proceso
- \`language\`: Idioma (por defecto: "es")

### Organization (Organización)
- \`identifier\`: Identificador principal (RUC, DNI, etc.)
- \`name\`: Nombre de la organización
- \`address\`: Dirección
- \`contactPoint\`: Información de contacto
- \`roles\`: Roles en el proceso de contratación

### Tender (Convocatoria)
- \`procurementMethod\`: Método de contratación (open, selective, limited, direct)
- \`procurementMethodDetails\`: Detalles del método (Licitación Pública, Adjudicación Simplificada, etc.)
- \`value\`: Valor estimado de la convocatoria
- \`items\`: Bienes, servicios u obras a contratar

### Award (Adjudicación)
- \`suppliers\`: Proveedores adjudicados
- \`value\`: Valor de la adjudicación
- \`contractPeriod\`: Período de entrega

### Contract (Contrato)
- \`dateSigned\`: Fecha de firma del contrato
- \`implementation\`: Información sobre la ejecución

## Tipos de procesos en Perú

- **LP**: Licitación Pública
- **AS**: Adjudicación Simplificada
- **CP**: Comparación de Precios
- **SE**: Selección de Ejecutor de Obra
- **CS**: Concurso de Proyectos de Arquitectura
- **CD**: Contratación Directa

## Ejemplo de OCID

\`\`\`
ocds-213czf-PE-2024-LP-00001
\`\`\`

Donde:
- \`ocds-213czf\`: Prefijo OCDS para Perú
- \`PE\`: Código de país (Perú)
- \`2024\`: Año del proceso
- \`LP\`: Tipo de proceso (Licitación Pública)
- \`00001\`: Número secuencial

## Validación

Para validar datos OCDS Peru, utilice el script de validación:

\`\`\`bash
npm run validate
\`\`\`

## Enlaces útiles

- [SEACE - Portal de contrataciones del Estado](https://seace.gob.pe)
- [OSCE - Organismo Supervisor de las Contrataciones del Estado](https://www.osce.gob.pe)
- [OCDS Standard](https://standard.open-contracting.org/)
`;

  await fs.writeFile(path.join(docsDir, 'schema.md'), schemaReadme);
  
  // Generate implementation guide
  const implementationGuide = `# Guía de Implementación OCDS Peru

## Introducción

Esta guía proporciona instrucciones detalladas para implementar el estándar OCDS en el contexto peruano.

## Configuración inicial

1. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

2. Validar el esquema:
\`\`\`bash
npm run validate
\`\`\`

## Estructura de archivos

\`\`\`
ocds-peru/
├── schema/           # Esquemas JSON
├── examples/         # Ejemplos de datos
├── scripts/          # Scripts de utilidad
├── docs/            # Documentación
└── package.json     # Configuración del proyecto
\`\`\`

## Creación de datos OCDS

### 1. Identificadores

#### OCID (Open Contracting ID)
Formato: \`ocds-213czf-PE-YYYY-TIPO-NNNNN\`

Ejemplo:
\`\`\`javascript
const ocid = "ocds-213czf-PE-2024-LP-00001";
\`\`\`

#### Release ID
Formato: \`PE-YYYY-TIPO-NNNNN-etapa\`

Ejemplo:
\`\`\`javascript
const releaseId = "PE-2024-LP-00001-tender";
\`\`\`

### 2. Organizaciones

#### Entidad compradora
\`\`\`json
{
  "name": "Ministerio de Educación del Perú",
  "identifier": {
    "scheme": "RUC",
    "id": "20131370018",
    "legalName": "Ministerio de Educación"
  },
  "roles": ["buyer"]
}
\`\`\`

#### Proveedor
\`\`\`json
{
  "name": "Empresa Proveedora S.A.C.",
  "identifier": {
    "scheme": "RUC",
    "id": "20601234567",
    "legalName": "Empresa Proveedora Sociedad Anónima Cerrada"
  },
  "roles": ["supplier"]
}
\`\`\`

### 3. Valores monetarios

Todos los valores monetarios deben especificar la moneda:

\`\`\`json
{
  "amount": 100000.00,
  "currency": "PEN"
}
\`\`\`

### 4. Fechas

Use formato ISO 8601 con zona horaria:

\`\`\`json
{
  "startDate": "2024-01-15T09:00:00Z",
  "endDate": "2024-12-31T17:00:00Z"
}
\`\`\`

## Métodos de contratación

| Código | Descripción | Umbral |
|--------|-------------|---------|
| open | Licitación Pública | > 400,000 PEN |
| selective | Adjudicación Simplificada | 8 UIT - 400,000 PEN |
| limited | Comparación de Precios | 3 - 8 UIT |
| direct | Contratación Directa | Casos especiales |

## Clasificaciones

### CPV (Common Procurement Vocabulary)
Sistema europeo adoptado por muchos países.

### UNSPSC (United Nations Standard Products and Services Code)
Sistema de clasificación de productos y servicios de las Naciones Unidas.

## Validación de datos

Utilice el validador incluido:

\`\`\`javascript
const OCDSPeruValidator = require('./scripts/validate');
const validator = new OCDSPeruValidator();

const result = validator.validateData(myOCDSData);
if (result.valid) {
  console.log('Datos válidos');
} else {
  console.log('Errores:', result.errors);
}
\`\`\`

## Publicación de datos

1. Validar datos contra el esquema
2. Generar URI único para el paquete
3. Incluir metadatos del publicador
4. Especificar licencia de datos abiertos
5. Publicar en formato JSON

## Consideraciones específicas para Perú

### SEACE Integration
- Mapear campos de SEACE a OCDS
- Mantener referencias a procesos SEACE
- Incluir información de la ficha técnica

### Legislación aplicable
- Ley de Contrataciones del Estado (Decreto Legislativo N° 1444)
- Reglamento de la Ley de Contrataciones del Estado (Decreto Supremo N° 344-2018-EF)
- Directivas OSCE

### Tipos de documentos
- Bases integradas
- Acta de otorgamiento de buena pro
- Contrato
- Orden de compra/servicio
- Conformidad de entrega

## Soporte y recursos

- [Documentación OCDS](https://standard.open-contracting.org/)
- [OSCE Perú](https://www.osce.gob.pe)
- [SEACE](https://seace.gob.pe)
`;

  await fs.writeFile(path.join(docsDir, 'implementation.md'), implementationGuide);
  
  console.log('✅ Documentation generated successfully');
}

async function validateExamples() {
  console.log('🔍 Validating example files...');
  
  const OCDSPeruValidator = require('./validate');
  const validator = new OCDSPeruValidator();
  
  const result = await validator.validateExamples();
  
  if (result.invalidFiles > 0) {
    console.error(`❌ Build failed: ${result.invalidFiles} invalid files found`);
    process.exit(1);
  }
  
  console.log('✅ All example files are valid');
}

async function generatePackageInfo() {
  console.log('📦 Generating package information...');
  
  const schema = await fs.readJson(path.join(__dirname, '../schema/ocds-peru-schema.json'));
  const packageJson = await fs.readJson(path.join(__dirname, '../package.json'));
  
  const info = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    ocdsVersion: schema.properties.version.enum[0],
    schemaVersion: '1.0.0',
    generatedAt: new Date().toISOString(),
    license: packageJson.license,
    keywords: packageJson.keywords
  };
  
  await fs.writeJson(path.join(__dirname, '../docs/package-info.json'), info, { spaces: 2 });
  
  console.log('✅ Package information generated');
}

async function build() {
  console.log('🏗️  Building OCDS Peru...\n');
  
  try {
    await generateDocumentation();
    await validateExamples();
    await generatePackageInfo();
    
    console.log('\n🎉 Build completed successfully!');
    console.log('\nGenerated files:');
    console.log('  📄 docs/schema.md');
    console.log('  📄 docs/implementation.md');
    console.log('  📄 docs/package-info.json');
    
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run build if called directly
if (require.main === module) {
  build();
}

module.exports = {
  generateDocumentation,
  validateExamples,
  generatePackageInfo,
  build
};