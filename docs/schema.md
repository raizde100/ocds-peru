# OCDS Peru Schema

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
- `ocid`: Identificador único del proceso de contratación
- `id`: Identificador único de la publicación
- `date`: Fecha de la publicación
- `tag`: Etiquetas que indican la etapa del proceso
- `language`: Idioma (por defecto: "es")

### Organization (Organización)
- `identifier`: Identificador principal (RUC, DNI, etc.)
- `name`: Nombre de la organización
- `address`: Dirección
- `contactPoint`: Información de contacto
- `roles`: Roles en el proceso de contratación

### Tender (Convocatoria)
- `procurementMethod`: Método de contratación (open, selective, limited, direct)
- `procurementMethodDetails`: Detalles del método (Licitación Pública, Adjudicación Simplificada, etc.)
- `value`: Valor estimado de la convocatoria
- `items`: Bienes, servicios u obras a contratar

### Award (Adjudicación)
- `suppliers`: Proveedores adjudicados
- `value`: Valor de la adjudicación
- `contractPeriod`: Período de entrega

### Contract (Contrato)
- `dateSigned`: Fecha de firma del contrato
- `implementation`: Información sobre la ejecución

## Tipos de procesos en Perú

- **LP**: Licitación Pública
- **AS**: Adjudicación Simplificada
- **CP**: Comparación de Precios
- **SE**: Selección de Ejecutor de Obra
- **CS**: Concurso de Proyectos de Arquitectura
- **CD**: Contratación Directa

## Ejemplo de OCID

```
ocds-213czf-PE-2024-LP-00001
```

Donde:
- `ocds-213czf`: Prefijo OCDS para Perú
- `PE`: Código de país (Perú)
- `2024`: Año del proceso
- `LP`: Tipo de proceso (Licitación Pública)
- `00001`: Número secuencial

## Validación

Para validar datos OCDS Peru, utilice el script de validación:

```bash
npm run validate
```

## Enlaces útiles

- [SEACE - Portal de contrataciones del Estado](https://seace.gob.pe)
- [OSCE - Organismo Supervisor de las Contrataciones del Estado](https://www.osce.gob.pe)
- [OCDS Standard](https://standard.open-contracting.org/)
