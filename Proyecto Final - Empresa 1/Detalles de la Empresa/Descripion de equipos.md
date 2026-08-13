---
titulo: Descripción de Equipos — Aegis Solutions
empresa: Aegis Solutions (MSSP)
materia: TI-203 — Proyecto Final 2026-C2
plataforma: PNETLab
estado: En implementación por fases (Fase 1 completa; Fases 2-3 planificadas)
tags:
  - ciberseguridad
  - redes
  - proyecto-final
---

# 🛡️ Descripción de Equipos — Aegis Solutions

> **Contexto:** Todos los equipos se emulan en **PNETLab**. La arquitectura sigue un modelo jerárquico adaptado para un proveedor de servicios de seguridad (MSSP), integrando una topología **Hub-and-Spoke mediante DMVPN** para la comunicación cifrada de los Centros de Operaciones (SOC).

---

## 📋 Inventario Consolidado

| # | Equipo | Sede | Rol | Modelo | Fase | Script |
|---|--------|------|-----|--------|------|--------|
| 1 | R-SD | Santo Domingo | Core + Hub DMVPN | Cisco 7200 | ✅ 1 | [[R-Santo Domingo.md]] |
| 2 | SWM-1 | Santo Domingo | Distribución L3 (principal) | Catalyst 3560 | ✅ 1 | [[SWM-1.md]] |
| 3 | SWM-2 | Santo Domingo | Distribución L3 (redundante) | Catalyst 3560 | ✅ 1 | [[SWM-2.md]] |
| 4 | SW-10 | Santo Domingo | Acceso L2 | Catalyst 2960 | ✅ 1 | [[SW-10.md]] |
| 5 | SW-11 | Santo Domingo | Acceso L2 | Catalyst 2960 | ✅ 1 | [[SW-11.md]] |
| 6 | SW-12 | Santo Domingo | Acceso L2 | Catalyst 2960 | ✅ 1 | [[SW-12.md]] |
| 7 | R-SANTIAGO | Santiago | Spoke DMVPN | Cisco 7200 | ⏳ 2 | [[R-Santiago.md]] *(básico)* |
| 8 | SW-STGO-CORE | Santiago | Distribución L3 | Catalyst 3560 | ⏳ 2 | *Por crear* |
| 9 | SW-STGO-AC1 | Santiago | Acceso L2 | Catalyst 2960 | ⏳ 2 | *Por crear* |
| 10 | R-ROMANA | La Romana | Spoke DMVPN | Cisco 7200 | ✅ 1 | [[R-Romana.md]] |
| 11 | SW-3 | La Romana | Distribución | Catalyst 3560 | ✅ 1 | [[SW-3.md]] |
| 12 | SW-9 | La Romana | Acceso L2 | Catalyst 2960 | ✅ 1 | [[SW-9.md]] |
| 13 | R-PUERTO-PLATA | Puerto Plata | Spoke DMVPN | Cisco 7200 | ⏳ 3 | *Por crear* |
| 14 | ISP-NUBE | Nube | ISP (NAT de salida) | Router emulado | ✅ 1 | [[ISP-NUBE.md]] |
| — | SRV-* (Linux) | Santiago (VLAN 199) | RADIUS / DNS / NTP / Zabbix-Wazuh | Ubuntu/CentOS | ⏳ 2 | *Por crear* |

> **Leyenda de fases:** ✅ **Fase 1** = implementada (Santo Domingo + La Romana + ISP). ⏳ **Fase 2** = Santiago (planificada, en proceso). ⏳ **Fase 3** = Puerto Plata (planificada).

---

## 🏙️ Sede Santo Domingo (Sede Central / Hub)

**Función:** Administración, SOC e Infraestructura Corporativa.

### 1. Router R-SD — Core & Hub DMVPN

| Campo | Detalle |
|---|---|
| **Tipo** | Router de núcleo (Core Router) |
| **Modelo** | Cisco 7200 (emulado en PNETLab) |
| **Cantidad** | 1 |
| **Función** | Punto central de enrutamiento y **Hub DMVPN (NHRP)**. Conecta el SOC con Internet y los spokes (Santiago, La Romana, Puerto Plata). Termina los túneles cifrados y distribuye tráfico a SWM-1/SWM-2. |
| **Interfaces** | `e0/2` → SWM-1 (10.255.255.1/30) \| `e0/1` → SWM-2 (10.255.255.5/30) \| `e0/0` → Internet/ISP (1.0.0.2/30) \| `Tunnel1` → 10.1.100.1/24 (Hub DMVPN) |
| **OSPF** | Área 0 (Backbone/Túnel) + Área 10 (Santo Domingo) |
| **DHCP** | 7 pools por VLAN (10-70) + exclusión de gateways HSRP + `ip helper-address` desde SWM-1/SWM-2 |
| **Seguridad** | SSHv2 (RSA 2048), NAT Overload (PAT), ACLs `VPN-TRAFFIC` y `NAT-INTERNAS`, banner MOTD |
| **Justificación** | Alta capacidad para múltiples protocolos. Hub central que requiere alta disponibilidad (HA), redundancia de rutas y terminación de túneles seguros para proteger los datos de los clientes. |

> ⚠️ **Nota:** este script usa `enable secret cisco123`, mientras el resto de dispositivos usa `AEGIS-2026`. Unificar credenciales.

### 2. Switch SWM-1 — Distribución L3 (Principal)

| Campo | Detalle |
|---|---|
| **Tipo** | Switch multicapa de distribución (Layer 3) |
| **Modelo** | Cisco Catalyst 3560 (emulado) |
| **Cantidad** | 1 |
| **Función** | Distribución en SD. Interconecta R-SD con la capa de acceso mediante trunks 802.1Q. Realiza **inter-VLAN routing** para los departamentos operativos del SOC. |
| **STP** | Root Bridge (prioridad 24576) — Rapid PVST |
| **HSRP** | **Activo** (prioridad 120 + preempt) para cada VLAN operativa (10-70) |
| **EtherChannel** | Po1 (LACP `mode active`) hacia SWM-2 por e0/1–e0/3 |
| **Uplinks** | `e0/0` → R-SD (10.255.255.2/30) \| `e1/0`–`e1/2` → SW-10 / SW-11 / SW-12 |
| **SVIs (gateways)** | VLAN 10 → .194 \| VLAN 20 → .50 \| VLAN 30 → .226 \| VLAN 40 → .2 \| VLAN 50 → .2 \| VLAN 60 → .2 \| VLAN 70 → .2 |
| **VTP** | ⚠️ *Mencionado en descripción pero no configurado en el script* — las VLANs se crean manualmente |
| **OSPF** | Área 10 (router-id 2.2.2.2) |
| **Justificación** | Arquitectura de 3 capas permite escalar sin rediseño. Reduce la carga de enrutamiento en R-SD. |

### 3. Switch SWM-2 — Distribución L3 (Redundante)

| Campo | Detalle |
|---|---|
| **Tipo** | Switch multicapa de distribución (Layer 3) |
| **Modelo** | Cisco Catalyst 3560 (emulado) |
| **Cantidad** | 1 |
| **Función** | Distribución redundante en SD. Backup de SWM-1 para garantizar que el centro de monitoreo no pierda conexión. |
| **STP** | Root Bridge Secundario (prioridad 28672) — Rapid PVST |
| **HSRP** | **Standby** (prioridad 110) de SWM-1 para VLAN 10-70 |
| **EtherChannel** | Po1 (LACP `mode active`) hacia SWM-1 por e0/1–e0/3 |
| **Uplinks** | `e0/0` → R-SD (10.255.255.6/30) \| `e1/0`–`e1/2` → SW-10 / SW-11 / SW-12 |
| **SVIs (gateways)** | VLAN 10 → .195 \| VLAN 20 → .51 \| VLAN 30 → .227 \| VLAN 40 → .3 \| VLAN 50 → .3 \| VLAN 60 → .3 \| VLAN 70 → .3 |
| **VTP** | ⚠️ *Ídem SWM-1: no configurado en el script* |
| **OSPF** | Área 10 (router-id 3.3.3.3) |
| **Justificación** | Redundancia de pasarela (HSRP) y de enrutamiento: si SWM-1 falla, SWM-2 asume los gateways sin interrumpir el SOC. |

### 4. Switches de Acceso — Capa L2 (SW-10, SW-11, SW-12)

| Campo | Detalle |
|---|---|
| **Tipo / Modelo** | Switch de acceso (Layer 2) / Cisco Catalyst 2960 (emulado) |
| **Cantidad** | 3 |
| **Uplinks** | Doble trunk (`e0/0`–`e0/1`) hacia SWM-1 y SWM-2 (802.1Q, native VLAN 99) |
| **Seguridad** | Port Security (MAC sticky, máx. 2, `restrict`), BPDU Guard, PortFast, DHCP Snooping |
| **VTP** | ⚠️ *Mencionado pero no configurado en scripts* |
| **Justificación** | Segmentación estricta de tráfico por departamento. Crítico en una empresa de seguridad para aislar las herramientas de pentesting de las redes administrativas. |

**Distribución de VLANs por switch de acceso:**

| Switch | VLANs servidas | Departamentos |
|---|---|---|
| **SW-10** | 10, 20 | Dirección General, RRHH |
| **SW-11** | 30, 40 | Cumplimiento y Auditoría, Soporte Técnico |
| **SW-12** | 50, 60, 70 | Finanzas, Ventas, Marketing |

---

## 🌄 Sede Santiago (Sucursal / Nodo Spoke) — Fase 2 ⏳

**Función:** Centro de Datos y Servicios Empresariales.

> **Estado:** sede en configuración (Fase 2). El router ya está desplegado de forma básica; los switches y los servicios de red están planificados según el VLSM. **Sujeto a cambios.**

### 5. Router R-SANTIAGO

| Campo | Detalle |
|---|---|
| **Tipo / Modelo** | Router de sucursal (Branch Router) / Cisco 7200 (emulado) |
| **Cantidad** | 1 |
| **Función (diseño)** | Punto de salida WAN para Santiago. Conecta con Internet y alimenta al core local. Gestionará NAT, NTP y el túnel Spoke DMVPN. |
| **OSPF (diseño)** | Área 20 (Santiago) |
| **Estado actual** | Desplegado de forma básica: `hostname`, IP WAN (`1.0.0.6/30`) y ruta por defecto. **Por completar en Fase 2**: DMVPN (Tunnel1), OSPF, NAT, DHCP y NTP |
| **Justificación** | La sede opera de forma autónoma ante fallos WAN y mantiene su propio análisis perimetral. |

### 6. Capa de Conmutación Santiago (por crear)

| Equipo | Tipo / Modelo | Función (diseño) | Estado |
|---|---|---|---|
| **SW-STGO-CORE** | Multicapa / Catalyst 3560 | Núcleo local, ACLs, VTP Server `AEGIS-STG` | ⏳ Por crear (Fase 2) |
| **SW-STGO-AC1** | Acceso / Catalyst 2960 | Puertos de analistas con Port Security, BPDU Guard, PortFast | ⏳ Por crear (Fase 2) |

> **VLANs planificadas en Santiago** (según VLSM): VLAN 110 Centro de Datos, 130 Ventas Corporativas, 140 Administración, 199 Servidores.

---

## 🏖️ Sede La Romana (Sucursal / Nodo Spoke)

**Función:** Consultoría e Implementación de Proyectos.

### 7. Router R-ROMANA

| Campo | Detalle |
|---|---|
| **Tipo / Modelo** | Router de sucursal (Branch Router) / Cisco 7200 (emulado) |
| **Cantidad** | 1 |
| **Función** | Conecta La Romana con Internet. Enruta el tráfico de las VLANs de Consultoría TI, Dirección Regional e Ingeniería de Infraestructura mediante **Router-on-a-Stick** (subinterfaces 802.1Q). |
| **Interfaces** | `e0/1.210` → Dir. Regional (10.0.16.129/26) \| `e0/1.220` → Consultoría TI (10.0.8.1/23) \| `e0/1.230` → Infraestructura (10.0.15.129/25) \| `e0/0` → ISP (1.0.0.10/30) \| `Tunnel1` → 10.1.100.3/24 (Spoke DMVPN) |
| **OSPF** | Área 30 (La Romana) + Área 0 (Túnel DMVPN) |
| **DHCP** | 3 pools por VLAN (210, 220, 230) |
| **Seguridad** | SSHv2, NAT Overload, ACLs `VPN-TRAFFIC` / `NAT-INTERNAS`, banner MOTD |
| **Justificación** | Aloja a equipos de consultoría técnica que requieren calidad de servicio y alta disponibilidad hacia la sede central. |

### 8. Capa de Conmutación La Romana (SW-3 y SW-9)

| Campo | Detalle |
|---|---|
| **SW-3 (Distribución)** | Switch Catalyst 3560. VLANs 210/220/230 + native 99. Trunk hacia R-ROMANA (`e0/0`). **EtherChannel Po1 (LACP `mode active`)** hacia SW-9 por e0/1–e0/2. Root Bridge (prioridad 24576) |
| **SW-9 (Acceso)** | Switch Catalyst 2960. Puertos de acceso con Port Security (máx. 2, sticky, `restrict`), BPDU Guard, PortFast. Servicios: Dir. Regional (VLAN 210), Consultoría TI (VLAN 220), Ing. Infraestructura (VLAN 230) |

> ⚠️ **Corrección:** la descripción anterior decía "EtherChannel estático" y el documento de topología dice `mode on`, pero **los scripts usan LACP `mode active`** — esta es la implementación correcta.

---

## 🚢 Sede Puerto Plata (Nodo Spoke) — Fase 3 ⏳

**Función:** Laboratorio Avanzado de Ciberseguridad.

> **Estado:** sede planificada (Fase 3). El diseño de red ya está definido (VLANs y VLSM); los scripts se crearán en esta fase. **Sujeto a cambios.**

| Equipo | Rol (diseño) | Estado |
|---|---|---|
| **R-PUERTO-PLATA** | Router Spoke DMVPN (enlace WAN `1.0.0.14/30`) | ⏳ Por crear (Fase 3) |
| **Switches de acceso** | Acceso L2 para VLANs 310-350 | ⏳ Por crear (Fase 3) |

**VLANs planificadas (según VLSM):** 310 DFIR, 320 Malware Research Lab, 330 Threat Intelligence, 340 Red Team, 350 Ciberseguridad (SOC).

---

## 🌐 ISP-NUBE (Nube Pública)

| Campo | Detalle |
|---|---|
| **Tipo** | Router emulado del ISP / nube pública |
| **Función** | Provee conectividad WAN a las 4 sedes y salida a Internet (NAT Overload hacia el cloud) |
| **Interfaces** | `e0/3` → Santo Domingo (1.0.0.1/30) \| `e0/1` → Santiago (1.0.0.5/30) \| `e0/2` → La Romana (1.0.0.9/30) \| `e1/1` → Puerto Plata (1.0.0.13/30) |
| **Nota** | ⚠️ La sección NAT del script lista `e1/1` sin IP explícita; verificar |

---

## 🖥️ Servidores Linux (Infraestructura de Soporte)

| Campo | Detalle |
|---|---|
| **Plataforma** | Ubuntu Server / CentOS (emulado en PNETLab) |
| **Ubicación** | Santiago — VLAN 199 Servidores (10.0.10.0/23, DNS interno 10.0.10.10) |
| **RADIUS** | AAA centralizado para acceso administrativo (SSH) |
| **DNS interno** | Resolución corporativa (`aegis.com.do`) |
| **NTP** | Sincronización de tiempo de todos los dispositivos |
| **Zabbix / Wazuh** | Monitoreo SNMPv3 + correlación de eventos de seguridad de toda la topología |
| **Justificación** | Como empresa MSSP, Aegis Solutions requiere control total de sus propios datos. Mantener servidores propios garantiza seguridad, cumplimiento normativo y disponibilidad inmediata de la plataforma operativa. |

---

## 🗺️ Roadmap de implementación

| Fase | Alcance | Estado |
|---|---|---|
| **1** | Santo Domingo (hub + SOC) + La Romana (spoke) + ISP-NUBE | ✅ Implementada |
| **2** | Santiago: completar R-SANTIAGO (DMVPN, OSPF Área 20, NAT, DHCP, NTP) + crear SW-STGO-CORE y SW-STGO-AC1 + servidores Linux | ⏳ En curso |
| **3** | Puerto Plata: crear R-PUERTO-PLATA (spoke) + switches de acceso + VLANs 310-350 | ⏳ Planificada |

---

## ⚠️ Inconsistencias a corregir (entre dispositivos ya implementados)

### Credenciales y claves
1. **Credenciales**: `R-SD` usa `cisco123`; el resto usa `AEGIS-2026` (política oficial). Unificar en `AEGIS-2026`.
2. **NHRP auth**: `R-Santo Domingo.md` usa `AEGIS`; `VPN en R-Santo Domingo.md` usa `Empresa-1`. Debe ser una sola clave en ambos extremos (Hub y Spokes).

### Configuración
3. **VTP**: la descripción menciona VTP Server/Client, pero ningún script lo configura (las VLANs son manuales). Si se va a usar VTP, añadir `vtp mode`/`vtp domain`; si no, eliminar la mención.
4. **ISP-NUBE `e1/1`**: falta `ip address 1.0.0.13 255.255.255.252` en la sección NAT (relevante para la Fase 3).
5. **EtherChannel**: unificar terminología — los scripts usan LACP (`mode active`), no `mode on` ni "estático".

### Documentación
6. Renombrar carpetas `Scrip` → `Script` y el archivo `Descripion de equipos` → `Descripción de equipos` (opcional; rompe enlaces si hay referencias).
7. Los pools DHCP de R-SD y R-ROMANA apuntan a `8.8.8.8`/`8.8.4.4` como DNS; el DNS interno es `10.0.10.10` — decidir si la resolución interna debe ser la primaria.
