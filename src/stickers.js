export const STICKER_COUNT = 10;

// las posiciones exactas las consegui con ia [skull]
export const STICKER_POS = [
    [1487, 25],   // 1
    [608, 588],   // 2
    [662, 1048],  // 3  
    [0, 65],      // 4
    [1244, 2],    // 5
    [13, 847],    // 6
    [360, 19],    // 7
    [1567, 899],  // 8
    [899, 186],   // 9
    [1076, 555]   // 10 
]

// el estado de desbloqueo de sticker se guarda en el registry este global
export function getStickers(registry) {
    // busca si hay algo guardado con ese nombre clave
    if (!registry.has("stickers")) {
        // crea el array con todo false,, o sea bloqueados
        // el .set lo guarda en el registry yey
        registry.set("stickers", new Array(STICKER_COUNT).fill(false));
    }
    
    //lo devuelve
    return registry.get("stickers");
}

export function countStickers(registry) {
    // contamos cuantos stikers hay debsloqeados
    // el filter se queda solo con los TRUEE y .length pues el valor de los desbloqueados
    return getStickers(registry).filter(Boolean).length;
}

// desbloquear stickers por id
export function unlockSticker(registry, id) {
    let stickers = getStickers(registry);
    if (id < 1 || id > STICKER_COUNT || stickers[id - 1]) return false; // si es invalido o ya desbloqueado
    stickers [id - 1] = true;
    return true;
}

export function unlockNextSticker(registry) {
    let stickers = getStickers(registry);
    let i = stickers.indexOf(false);
    if (i === -1) return 0;
    stickers[i] = true;
    return i + 1;
}