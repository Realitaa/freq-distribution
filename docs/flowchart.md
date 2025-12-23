# Flowchart Website Implementasi Distribusi Frekuensi Data

Berikut adalah flowchart implementasi distribusi frekuensi data:

[![](https://mermaid.ink/img/pako:eNqlU-9zmkAQ_Vd27kPHVKNAtCFMkg4RqjSIRMBpm8swZyCGomfmxCat-r93OX9O-rHO4Oy93fd22XssyeMsSYlBniaz18dnJgoILcopNyv3lPQi13QoeTihvH3fcDw_CqEBke_2TQssVrDGA-U3WOibg8DxOvABhqbrWGbgyDRSKbdjxJaUlAAM2SRLPlOypvxLbA8G943Q7PmOe2t64KdzxsEWYiZKXcotVOZwBV-jnmt2KwkKnFyORON6mpVwz_GOMfZWYua3I0wwPk4RLXOngCw5EOUdFM4RV6EKZ_UzTYOP4PY7qlLhG2LlZjFhRY7j5Cmg3PxEMrvIy3iRil9sEuODEm3bcSubPg3IN2UOlhVZkeUxe5VFh849XETkhdEtZLL_vJFALtfhIWlUtopHyHrG7EFCkvv7gvIP88fVVTieS9b72CqDS8g3675D-pNI80XK52XvrhNGXie2zNCMLSce2F5oep3KsejlFZS7RI1D380bDv5D7OoftQDVAqfnowdubSjYKJ3Ee3VZEb7f6EFiu9jo2EnvJEo3DUs_B7ZrBztHo8fh9PQa2mhuGdygl2UgHbs1bgmswixh-QqkY7fG3VEPRd_ZCuSnY8lcB20mgy76RgYOOkMGPekESXIZ_7koVuChAWSujxctAx9vcK97tztsJ8Ep7mRVgHexCwIZhLgtDIASBw3B8HqyapWS942DdIKfW7aCCHcnk0NSI2ORJcQoxCKtkWkqpqw8kiXlgHrFczpNKTEwTJhA11K-Rs4L4z9ms-mOJmaL8TMxnthkjqfFC156amVsLNh0j4qUJ6lozxa8IMaFLjWIsSRvxNBaF3UNf2qzpZ8riqK3auQ3MVRVreu62moqrea5cq7pZ-sa-SPbanWENPWT3rpQNUVXms31X2aKfrA?type=png)](https://mermaid.live/edit#pako:eNqlU-9zmkAQ_Vd27kPHVKNAtCFMkg4RqjSIRMBpm8swZyCGomfmxCat-r93OX9O-rHO4Oy93fd22XssyeMsSYlBniaz18dnJgoILcopNyv3lPQi13QoeTihvH3fcDw_CqEBke_2TQssVrDGA-U3WOibg8DxOvABhqbrWGbgyDRSKbdjxJaUlAAM2SRLPlOypvxLbA8G943Q7PmOe2t64KdzxsEWYiZKXcotVOZwBV-jnmt2KwkKnFyORON6mpVwz_GOMfZWYua3I0wwPk4RLXOngCw5EOUdFM4RV6EKZ_UzTYOP4PY7qlLhG2LlZjFhRY7j5Cmg3PxEMrvIy3iRil9sEuODEm3bcSubPg3IN2UOlhVZkeUxe5VFh849XETkhdEtZLL_vJFALtfhIWlUtopHyHrG7EFCkvv7gvIP88fVVTieS9b72CqDS8g3675D-pNI80XK52XvrhNGXie2zNCMLSce2F5oep3KsejlFZS7RI1D380bDv5D7OoftQDVAqfnowdubSjYKJ3Ee3VZEb7f6EFiu9jo2EnvJEo3DUs_B7ZrBztHo8fh9PQa2mhuGdygl2UgHbs1bgmswixh-QqkY7fG3VEPRd_ZCuSnY8lcB20mgy76RgYOOkMGPekESXIZ_7koVuChAWSujxctAx9vcK97tztsJ8Ep7mRVgHexCwIZhLgtDIASBw3B8HqyapWS942DdIKfW7aCCHcnk0NSI2ORJcQoxCKtkWkqpqw8kiXlgHrFczpNKTEwTJhA11K-Rs4L4z9ms-mOJmaL8TMxnthkjqfFC156amVsLNh0j4qUJ6lozxa8IMaFLjWIsSRvxNBaF3UNf2qzpZ8riqK3auQ3MVRVreu62moqrea5cq7pZ-sa-SPbanWENPWT3rpQNUVXms31X2aKfrA)

Kode Mermaid:

```mmd
flowchart TD

A(["MULAI"])
C[/INPUT / UPLOAD Data/]
B["PARSING & VALIDASI Data"]
E_VAL{"Data Valid?"}
F_ERR[/TAMPILKAN Pesan Error/]

D["n = JUMLAH(data)<br/>min = MIN(data)<br/>max = MAX(data)<br/>range = max - min"]

G["k = 1 + 3.322 * LOG10(n)<br/>(Bulatkan ke atas)"]
H["interval_val = CEIL(range / k)"]
I["titik_awal = min"]

M{"UNTUK i = 1 s/d k"}
N["batas_bawah = titik_awal"]
O["batas_atas = batas_bawah + interval_val"]
P{"i < k?"}
Q["frekuensi = HITUNG_DATA_DI_RENTANG(batas_bawah <= data < batas_atas)"]
R["frekuensi = HITUNG_DATA_DI_RENTANG(batas_bawah <= data <= batas_atas)"]
S["SIMPAN KE tabel_frekuensi"]
T["titik_awal = batas_atas"]

U[/TAMPILKAN tabel_frekuensi/]
V(["SELESAI"])

A --> C
C --> B
B --> E_VAL
E_VAL -->|Tidak| F_ERR
F_ERR --> C
E_VAL -->|Ya| D

D --> G
G --> H
H --> I
I --> M

M -->|Lanjut| N
N --> O
O --> P
P -->|Ya| Q
P -->|Tidak| R
Q --> S
R --> S
S --> T
T -- "Iterasi i++" --> M

M -->|Selesai| U
U --> V
```