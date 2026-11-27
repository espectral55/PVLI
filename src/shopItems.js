//objetos tienda
//id es el nombre entero que usa powerips
//permanent, si true, mejora que se copra una ves, false, consumible quie se gasta
//key y frame es el icono
export default[
    {id: "maxLife", name: "Vida máxima +1", permanent: true, price: 10, key: "dungeon", frame: 364},
     { id: "damage", name: "Daño +1", permanent: true, price: 15, key: "dungeon", frame: "sword" },
    { id: "speed", name: "Velocidad +25%", permanent: true, price: 12, key: "dungeon", frame: 396 },
    { id: "aura", name: "Aura más duradera", permanent: true, price: 20, key: "effects", frame: 5 },
    { id: "shotgun", name: "Escopeta", permanent: true, price: 30, key: "dungeon", frame: "swordBlue" },
    { id: "shield", name: "Escudo (para 1 golpe)", permanent: false, price: 8, key: "effects", frame: 0 },
    { id: "medkit", name: "Botiquín (cura 2, Q)", permanent: false, price: 6, key: "dungeon", frame: 424 }
]
