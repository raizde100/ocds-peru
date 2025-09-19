# OCDS Peru

**Open Contracting Data Standard (OCDS) implementation for Peru's public procurement system**

🇵🇪 Implementation del estándar OCDS para el sistema de contrataciones públicas del Perú, compatible con SEACE y la normativa nacional.

## 📋 Overview

Este proyecto implementa el estándar OCDS (Open Contracting Data Standard) versión 1.1 específicamente adaptado para el contexto peruano, incluyendo:

- **Esquemas JSON** validados para procesos de contratación pública
- **Ejemplos prácticos** de datos de licitaciones, adjudicaciones y contratos
- **Scripts de validación** para asegurar la conformidad con el estándar
- **Documentación completa** para implementadores
- **Compatibilidad con SEACE** (Sistema Electrónico de Contrataciones del Estado)

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/raizde100/ocds-peru.git
cd ocds-peru

# Install dependencies
npm install

# Validate examples
npm run validate

# Build documentation
npm run build
```

### Basic Usage

```javascript
const OCDSPeruValidator = require('./scripts/validate');

// Create validator instance
const validator = new OCDSPeruValidator();

// Validate OCDS data
const result = validator.validateData(myData);
if (result.valid) {
  console.log('✅ Valid OCDS data');
} else {
  console.log('❌ Validation errors:', result.errors);
}

// Generate Peru-specific OCID
const ocid = validator.generateOCID('2024', 'LP', '1');
console.log(ocid); // ocds-213czf-PE-2024-LP-00001
```

## 📁 Project Structure

```
ocds-peru/
├── schema/                 # JSON Schema files
│   └── ocds-peru-schema.json
├── examples/              # Sample OCDS data
│   ├── sample-procurement.json
│   └── sample-award.json
├── scripts/               # Utility scripts
│   ├── validate.js
│   └── build.js
├── docs/                  # Documentation
│   ├── schema.md
│   └── implementation.md
└── package.json          # Project configuration
```

## 🏛️ Peru-Specific Features

### OCID Format
```
ocds-213czf-PE-YYYY-TYPE-NNNNN
```
- `213czf`: OCDS prefix for Peru
- `PE`: Country code
- `YYYY`: Year
- `TYPE`: Process type (LP, AS, CP, etc.)
- `NNNNN`: Sequential number

### Process Types
- **LP**: Licitación Pública (Public Tender)
- **AS**: Adjudicación Simplificada (Simplified Procurement)
- **CP**: Comparación de Precios (Price Comparison)
- **SE**: Selección de Ejecutor de Obra (Works Contractor Selection)
- **CS**: Concurso de Proyectos (Project Competition)
- **CD**: Contratación Directa (Direct Contracting)

### Currency & Language
- **Default currency**: PEN (Peruvian Sol)
- **Default language**: Spanish (es)
- **Country**: Peru

### Organization Identifiers
- **RUC**: Registro Único de Contribuyentes
- **DNI**: Documento Nacional de Identidad
- **CE**: Carné de Extranjería

## 📊 Examples

### Tender Release
```json
{
  "ocid": "ocds-213czf-PE-2024-LP-001",
  "id": "PE-2024-LP-001-tender",
  "date": "2024-09-19T10:00:00Z",
  "tag": ["tender"],
  "language": "es",
  "buyer": {
    "name": "Ministerio de Educación del Perú",
    "identifier": {
      "scheme": "RUC",
      "id": "20131370018"
    }
  },
  "tender": {
    "title": "Licitación Pública para Equipos Informáticos",
    "procurementMethod": "open",
    "value": {
      "amount": 2450000.00,
      "currency": "PEN"
    }
  }
}
```

## 🛠️ Scripts

### Validation
```bash
# Validate all examples
npm run validate

# Validate specific file
node scripts/validate.js --file examples/sample-procurement.json

# Generate OCID
node scripts/validate.js --generate-ocid 2024 LP 1
```

### Build
```bash
# Build documentation and validate
npm run build
```

## 📚 Documentation

- [Schema Documentation](docs/schema.md) - Detailed schema reference
- [Implementation Guide](docs/implementation.md) - How to implement OCDS Peru
- [OCDS Standard](https://standard.open-contracting.org/) - Official OCDS documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Links

- [SEACE - Portal de Contrataciones del Estado](https://seace.gob.pe)
- [OSCE - Organismo Supervisor de las Contrataciones del Estado](https://www.osce.gob.pe)
- [Open Contracting Partnership](https://www.open-contracting.org/)
- [OCDS Standard](https://standard.open-contracting.org/)

## 🆘 Support

For questions or support:
- 📧 Create an issue in this repository
- 📖 Check the [documentation](docs/)
- 🌐 Visit [OSCE Peru](https://www.osce.gob.pe) for regulatory information

---

**Keywords**: OCDS, Peru, public procurement, contracting, transparency, SEACE, open data