# Guía de Implementación OCDS Peru

## Introducción

Esta guía proporciona instrucciones detalladas para implementar el estándar OCDS en el contexto peruano.

## Configuración inicial

1. Instalar dependencias:
```bash
npm install
```

2. Validar el esquema:
```bash
npm run validate
```

## Estructura de archivos

```
ocds-peru/
├── schema/           # Esquemas JSON
├── examples/         # Ejemplos de datos
├── scripts/          # Scripts de utilidad
├── docs/            # Documentación
└── package.json     # Configuración del proyecto
```

## Creación de datos OCDS

### 1. Identificadores

#### OCID (Open Contracting ID)
Formato: `ocds-213czf-PE-YYYY-TIPO-NNNNN`

Ejemplo:
```javascript
const ocid = "ocds-213czf-PE-2024-LP-00001";
```

#### Release ID
Formato: `PE-YYYY-TIPO-NNNNN-etapa`

Ejemplo:
```javascript
const releaseId = "PE-2024-LP-00001-tender";
```

### 2. Organizaciones

#### Entidad compradora
```json
{
  "name": "Ministerio de Educación del Perú",
  "identifier": {
    "scheme": "RUC",
    "id": "20131370018",
    "legalName": "Ministerio de Educación"
  },
  "roles": ["buyer"]
}
```

#### Proveedor
```json
{
  "name": "Empresa Proveedora S.A.C.",
  "identifier": {
    "scheme": "RUC",
    "id": "20601234567",
    "legalName": "Empresa Proveedora Sociedad Anónima Cerrada"
  },
  "roles": ["supplier"]
}
```

### 3. Valores monetarios

Todos los valores monetarios deben especificar la moneda:

```json
{
  "amount": 100000.00,
  "currency": "PEN"
}
```

### 4. Fechas

Use formato ISO 8601 con zona horaria:

```json
{
  "startDate": "2024-01-15T09:00:00Z",
  "endDate": "2024-12-31T17:00:00Z"
}
```

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

```javascript
const OCDSPeruValidator = require('./scripts/validate');
const validator = new OCDSPeruValidator();

const result = validator.validateData(myOCDSData);
if (result.valid) {
  console.log('Datos válidos');
} else {
  console.log('Errores:', result.errors);
}
```

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
