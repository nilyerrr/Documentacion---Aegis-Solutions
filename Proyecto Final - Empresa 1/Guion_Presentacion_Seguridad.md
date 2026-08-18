# Guion de Presentación: Seguridad de la Infraestructura de Aegis Solutions

*Nota: Lee este guion con un tono profesional, seguro y pausado. Haz énfasis en las palabras en **negrita** para destacar la importancia de las medidas.*

---

**[SALUDO E INTRODUCCIÓN]**

"Buenos días a todos. Como encargado de seguridad de **Aegis Solutions**, mi responsabilidad principal es garantizar que nuestra red no solo funcione de manera eficiente, sino que sea un entorno **hostil para cualquier atacante** y completamente resiliente ante amenazas tanto externas como internas. 

Hoy quiero presentarles la arquitectura de seguridad que hemos desplegado en nuestras cuatro sucursales: Santo Domingo, Santiago, La Romana y Puerto Plata. Toda nuestra estrategia se basa en un principio fundamental: la **Defensa en Profundidad** y el modelo **Zero Trust** o 'Cero Confianza'."

---

**[1. SEGURIDAD PERIMETRAL Y COMUNICACIÓN ENTRE SUCURSALES (VPN)]**

"Empecemos por el perímetro. Nuestras sucursales necesitan comunicarse a través de Internet, un medio inherentemente inseguro. 

Para proteger nuestros datos en tránsito, no usamos simples túneles. Hemos implementado una infraestructura **DMVPN** (Dynamic Multipoint VPN) fuertemente cifrada mediante **IPsec**. 
*   ¿Por qué lo hicimos? Porque utilizamos encriptación **AES-256**, grado militar, para que nadie pueda espiar nuestra información (confidencialidad). 
*   Además, aplicamos **SHA-256** para asegurar que ningún paquete de datos sea modificado en el camino (integridad), y requerimos autenticación estricta para evitar que un router falso intente conectarse a nuestra red. Lo que viaja entre nuestras sedes, es invisible e inviolable para el resto del mundo."

---

**[2. SEGURIDAD EN LA ADMINISTRACIÓN (MANAGEMENT PLANE)]**

"Pasando a la gestión de los equipos: de nada sirve una bóveda fuerte si dejamos las llaves en la puerta. 

Hemos **eliminado por completo el uso de Telnet**, ya que transmite contraseñas en texto plano. Todo el acceso administrativo se realiza a través de **SSH versión 2** con credenciales encriptadas. 
*   ¿Por qué implementamos esto junto con **Listas de Control de Acceso (ACLs)** en las líneas virtuales? Para garantizar que **solo el equipo de Soporte Técnico y Administración** pueda siquiera ver la pantalla de login de nuestros routers y switches. 
*   Además, si un administrador olvida cerrar su sesión, el equipo lo expulsará automáticamente a los 5 minutos de inactividad, cerrando esa ventana de riesgo."

---

**[3. SEGURIDAD DE LA RED INTERNA (CAPA 2) Y AISLAMIENTO]**

"Ahora, la parte más crítica: la protección interna. Las estadísticas demuestran que gran parte de los ciberataques provienen de dentro de la empresa, ya sea por un empleado descuidado o una máquina infectada. En nuestra Capa de Acceso (Capa 2), no confiamos en nadie.

Implementamos un blindaje completo en nuestros switches:
1.  **Port Security (Seguridad de Puertos):** ¿Por qué? Para evitar que alguien desconecte su PC de la oficina y conecte un switch personal o una laptop infectada. Restringimos los puertos para que solo acepten las direcciones MAC legítimas de nuestros equipos de trabajo.
2.  **Mitigación de VLAN Hopping:** Hemos deshabilitado la negociación automática de puertos y enviado todos los puertos sin uso a una **VLAN nativa aislada o 'Blackhole'**. ¿Por qué? Para asegurar que un atacante no pueda engañar al switch y 'saltar' hacia servidores críticos o bases de datos a las que no tiene permiso.
3.  **DHCP Snooping y Dynamic ARP Inspection (DAI):** ¿Por qué son vitales? Evitan que un atacante conecte un servidor DHCP falso para robar tráfico o intente hacerse pasar por la puerta de enlace de la empresa para interceptar las contraseñas de los usuarios (ataques Man-in-the-Middle). Nuestro switch audita cada petición y bloquea inmediatamente a los impostores.
4.  **Protecciones de Spanning Tree (STP):** Con tecnologías como **BPDU Guard** y **Root Guard**, evitamos que alguien conecte dispositivos de red no autorizados que puedan colapsar toda la topología de la empresa creando bucles de tráfico."

---

**[4. LISTAS DE CONTROL DE ACCESO (ACL) INTERNAS - EJEMPLO PRÁCTICO]**

"Y para darles un ejemplo real de cómo seccionamos nuestra red: aplicamos políticas estrictas de filtrado de tráfico dentro de nuestra propia sede. 

Por ejemplo, en nuestro router de Santo Domingo tenemos una regla específica **(ACL-MARKETING-OUT)**. ¿Por qué la implementamos? Para bloquear de raíz que los equipos del departamento de Marketing puedan siquiera hacer 'Ping' o intentar comunicarse con departamentos críticos como nuestro SOC (Centro de Operaciones de Seguridad), Red Team, Respuesta a Incidentes (DFIR) o el Laboratorio de Malware. 

Con esto garantizamos que, si un equipo de Marketing se infecta con Ransomware, la infección jamás podrá saltar a las áreas donde custodiamos la seguridad de la empresa."

---

**[CIERRE Y CONCLUSIÓN]**

"En conclusión: nuestra red en Aegis Solutions no asume que estás seguro solo por estar conectado a un cable de la oficina. Desde la encriptación IPsec en la frontera, hasta el bloqueo de MACs y validación ARP en el escritorio de cada empleado, hemos construido una infraestructura proactiva, resiliente y preparada para los estándares de ciberseguridad más exigentes de la industria.

Muchas gracias. Quedo a su disposición para cualquier pregunta técnica sobre la implementación."
