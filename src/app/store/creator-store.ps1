$nombre = Read-Host "Nombre Store"

write-host "Creando $nombre..."

New-Item -Path "$nombre" -ItemType Directory

New-Item -Path "$nombre\$nombre.action.ts" -ItemType File
New-Item -Path "$nombre\$nombre.effect.ts" -ItemType File
New-Item -Path "$nombre\$nombre.reducer.ts" -ItemType File
New-Item -Path "$nombre\$nombre.selector.ts" -ItemType File
