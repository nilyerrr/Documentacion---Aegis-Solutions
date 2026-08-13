---
titulo: Estructura de la Empresa — Aegis Solutions
empresa: Aegis Solutions (MSSP)
materia: TI-203 — Proyecto Final 2026-C2
estado: Organizado
tags:
  - ciberseguridad
  - estructura-organizacional
  - proyecto-final
---

# 🛡️ Estructura de la Empresa — Aegis Solutions

---

## 🏢 Perfil Corporativo

**Aegis Solutions** es un Proveedor de Servicios Gestionados de Seguridad y TI (**MSSP**) enfocado en proteger, administrar y optimizar la infraestructura tecnológica de empresas medianas y grandes. Actuamos como el **departamento externalizado** de tecnología y ciberseguridad para organizaciones que manejan datos críticos y requieren alta disponibilidad operativa.

### Misión y diferenciador

> **Security by Design** — No somos solo "soporte técnico": **seguridad desde el diseño**. No instalamos un servidor; lo instalamos blindado, segmentado en la VLAN correcta y monitoreado por nuestro SOC.

**Nicho de mercado:** empresas medianas y grandes (sector financiero, salud, manufactura o retail con múltiples sucursales) que manejan datos sensibles y no tienen el presupuesto para un departamento de ciberseguridad interno de 20 personas. **Nosotros somos ese departamento.**

---

## 🏛️ Organigrama Funcional

```
                    ┌─────────────────────────────────┐
                    │       NIVEL DIRECTIVO           │
                    │  CEO & CISO  —  Reylin Santana  │
                    │  CTO & Arq. Red — Neury         │
                    └───────────────┬─────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
┌────────┴─────────┐   ┌────────────┴──────────┐   ┌───────────┴─────────┐
│   PILAR A        │   │   PILAR B             │   │   PILAR C           │
│ SOC y Defensa    │   │ Auditoría Ofensiva    │   │ Ingeniería Infra.   │
│ Activa           │   │                       │   │                     │
├──────────────────┤   ├───────────────────────┤   ├─────────────────────┤
│ • Operaciones    │   │ • Red Team            │   │ • Consultoría TI    │
│   SOC (Tier1/2)  │   │ • Malware Research    │   │   (Tier 3/Arq.)     │
│ • DFIR           │   │ • Threat Intelligence│   │ • Ing. de Infra.    │
│ • Cumplimiento   │   │ • Pentesting          │   │   (Tier 2/Impl.)    │
└────────┬─────────┘   └───────────┬───────────┘   └───────────┬─────────┘
         └─────────────────────────┼───────────────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
┌───────┴────────┐      ┌──────────┴─────────┐     ┌───────────┴─────────┐
│ SOPORTE        │      │ ADMINISTRATIVO     │     │ SOPORTE TÉCNICO     │
│ CORPORATIVO    │      │ FINANCIERO         │     │                    │
│ • Ventas       │      │ • Finanzas         │     │ • Soporte Técnico   │
│ • Marketing    │      │ • RRHH             │     │ • Centro de Datos   │
│ • Legal/Compl. │      │ • Administración   │     │ • Servidores (Srv.) │
│ • Documentación│      │                    │     │                    │
└────────────────┘      └────────────────────┘     └────────────────────┘
```

---

## 🎖️ Nivel 1 — Directiva (Gobierno Corporativo)

| Cargo | Integrante | Responsabilidad |
|---|---|---|
| **CEO & CISO** | [[Roles y cargos de los integrantes.md\|Reylin Santana]] | Visión estratégica, arquitectura de seguridad, protocolos defensivos, monitoreo del SOC. |
| **CTO & Arquitecto de Red** | [[Roles y cargos de los integrantes.md\|Neury]] | Diseño de infraestructura, topologías, enrutamiento y conectividad WAN. |
| **CFO** *(Finanzas)* | — | Control financiero, presupuestos y facturación de servicios. |
| **CHRO** *(RRHH)* | — | Gestión del talento, contrataciones y clima laboral. |

> La directiva delega en las líneas de servicio (Pilares A/B/C) y en los departamentos de apoyo.

---

## 🛠️ Nivel 2 — Líneas de Servicio (Core MSSP)

### Pilar A: Centro de Operaciones de Seguridad (SOC) y Defensa Activa

> *"El corazón de Aegis. Para empresas que necesitan que alguien vigile su red mientras ellos duermen."*

| Departamento | Función | Sede |
|---|---|---|
| **Operaciones SOC (Tier 1 y 2)** | Monitoreo de alertas, revisión de logs, respuesta rápida ante incidentes. | Santo Domingo + Puerto Plata |
| **DFIR** *(Digital Forensics & Incident Response)* | Investigación forense y respuesta a incidentes. | Puerto Plata |
| **Cumplimiento y Auditoría** | Alineación con estándares internacionales y regulaciones locales (INDOTEL). | Santo Domingo |

**Servicios ofrecidos:** Monitoreo 24/7 (NOC/SOC) · Respuesta a Incidentes (Blue Team) · Gestión de Riesgos y Cumplimiento.

### Pilar B: Auditoría Técnica y Seguridad Ofensiva

> *"Servicios preventivos para encontrar los huecos antes que los ciberdelincuentes."*

| Departamento | Función | Sede |
|---|---|---|
| **Red Team** | Simulación de ataques controlados contra la infraestructura. | Puerto Plata |
| **Malware Research Lab** | Análisis de malware y desarrollo de contramedidas. | Puerto Plata |
| **Threat Intelligence** | Inteligencia de amenazas y contexto para el SOC. | Puerto Plata |

**Servicios ofrecidos:** Pentesting (caja blanca, gris y negra) · Análisis de vulnerabilidades · Ingeniería Social (phishing simulado).

### Pilar C: Ingeniería de Infraestructura y Servidores

> *"El cliente no solo necesita que lo protejan, necesita que le construyan la casa segura desde los cimientos."*

| Departamento | Función | Sede |
|---|---|---|
| **Consultoría TI (Tier 3 / Arquitectos)** | Levantamiento inicial con el cliente, diseño de soluciones a medida, políticas de Gestión de Riesgos. | La Romana |
| **Ingeniería de Infraestructura (Tier 2 / Implementadores)** | Configuración de hardware, bases de datos, OSPF, aplicación de VLSM. | La Romana |
| **Centro de Datos** | Operación del datacenter corporativo. | Santiago |
| **Servidores** | Administración de servidores empresariales (Web, Correo, FTP, DNS, RADIUS). | Santiago |

**Servicios ofrecidos:** Levantamiento y administración de servidores (Windows/Linux, AD, virtualización) · Arquitectura de redes corporativas (VLANs, DMVPN) · Diseño y aseguramiento de bases de datos.

---

## 📋 Nivel 3 — Departamentos de Apoyo

### Corporativo / Comercial

| Departamento | Función | Sede | Integrante |
|---|---|---|---|
| **Ventas / Ventas Corporativas** | Expansión, retención de clientes y cumplimiento de SLAs. | Santo Domingo / Santiago | — |
| **Marketing** | Posicionamiento de marca y generación de demanda. | Santo Domingo | — |
| **Legal y Adquisiciones** *(Compliance & Procurement)* | Legislación empresarial, auditoría de normativas, cotizaciones y presupuestos. | Santo Domingo | [[Roles y cargos de los integrantes.md\|Franchesca]] |

### Administrativo

| Departamento | Función | Sede |
|---|---|---|
| **Finanzas** | Gestión financiera y contabilidad. | Santo Domingo |
| **Recursos Humanos** | Gestión del talento. | Santo Domingo |
| **Administración** | Gestión operativa de sede. | Santiago |

### Técnico / Soporte

| Departamento | Función | Sede | Integrante |
|---|---|---|---|
| **Soporte Técnico** | Atención a incidencias internas de TI. | Santo Domingo | — |
| **Documentación** *(Technical Writer)* | Diagramas lógicos/físicos, bitácoras de red, manuales de entregables. | Santo Domingo | [[Roles y cargos de los integrantes.md\|Darling]] |
| **DevOps / Control de Versiones** | GitHub, integración continua, despliegue seguro. | Santo Domingo | [[Roles y cargos de los integrantes.md\|Randy]] |
| **Desarrollo Web** | Front-end, back-end y bases de datos de la plataforma. | Santo Domingo | [[Roles y cargos de los integrantes.md\|Starlin]] |

---

## 📍 Estructura por Sede (Mapa Físico)

| Sede | Rol en la Empresa | Departamentos | VLANs |
|---|---|---|---|
| 🏙️ **Santo Domingo** | Sede Central (Hub) — Administración, SOC e Infraestructura | Dirección General (10), RRHH (20), Cumplimiento (30), Soporte Técnico (40), Finanzas (50), Ventas (60), Marketing (70) | 10–70 |
| 🌄 **Santiago** | Centro de Datos y Servicios Empresariales | Centro de Datos (110), Ventas Corporativas (130), Administración (140), Servidores (199) | 110–199 |
| 🏖️ **La Romana** | Consultoría e Implementación de Proyectos | Dirección Regional (210), Consultoría TI (220), Ingeniería de Infraestructura (230) | 210–230 |
| 🚢 **Puerto Plata** | Laboratorio Avanzado de Ciberseguridad | DFIR (310), Malware Research (320), Threat Intelligence (330), Red Team (340), SOC (350) | 310–350 |

> Detalle completo de direccionamiento en [[Departamentos y VLSM.md]].

---

## 🔗 Matriz de Integración: Pilar ↔ Departamento ↔ Integrante

| Pilar | Departamento | Integrante(s) | Rol en el proyecto |
|---|---|---|---|
| A — SOC y Defensa | Operaciones SOC, Cumplimiento | Reylin Santana | CISO / Seguridad |
| A — SOC y Defensa | DFIR, Threat Intelligence (lab) | *(Por asignar)* | — |
| B — Ofensiva | Red Team, Malware Research | Reylin Santana *(dual)* | Pentesting / DMVPN / ACLs |
| C — Ingeniería | Consultoría TI, Ing. Infraestructura | Neury | OSPF, NAT, HSRP |
| C — Ingeniería | Servidores, Desarrollo Web | Starlin | Servidores Web/Correo/FTP/DNS/RADIUS |
| Apoyo — Técnico | DevOps, Control de Versiones, VLSM | Randy | GitHub, CI/CD, VLSM |
| Apoyo — Corporativo | Legal, Adquisiciones, Conf. L2 | Franchesca | Cumplimiento + VLANs/switches |
| Apoyo — Técnico | Documentación, Entregables | Darling | Diagramas, manuales, bitácoras |

> Detalle de cargos en [[Roles y cargos de los integrantes.md]] y de equipos en [[Descripion de equipos.md]].

---

## ⚠️ Observaciones para completar

1. **CFO y CHRO** están definidos como cargos pero **sin integrante asignado** — si el proyecto requiere 6 integrantes únicamente, considerar roles duales o dejarlos como "vacantes" de la empresa ficticia.
2. **Departamentos del lab (DFIR, Malware, Threat Intel)** no tienen integrante asignado; pueden cubrirse con roles duales de Reylin/Neury o definirse como parte del organigrama de la empresa sin asignación académica.
3. La matriz de integración es una **propuesta de trazabilidad**; ajustar según el reparto real del equipo.
