const colorByType = {
        
    grass: "bg-[#6DA633]",
    normal:  "bg-[#a4acaf]",
    fighting:  "bg-[#F28444]",
    flying:  "bg-[#3dc7ef]",
    poison:  "bg-[#B284BF]",
    ground:  "bg-[#ab9842]",
    rock:  "bg-[#734E38]",
    bug:  "bg-[#729f3f]",
    ghost:  "bg-[#38184C]",
    steel:  "bg-[#9eb7b8]",
    fire:  "bg-[#D94B18]",
    water:  "bg-[#0487D9]",
    electric:  "bg-[#F2C029]",
    psychic:  "bg-[#BF3F92]",
    ice:  "bg-[#88C9F2]",
    dragon:  "bg-gradient-to-r from-blue-500 via-blue-500 to-red-500 h-16 w-16",
    dark:  "bg-[#707070]",
    fairy:  "bg-[#F06A8A]",
    unknow:  "bg-[#757575]",
    shadow:  "bg-[#7b62a3]",
}

const imgByType = {
        
  grass: "../src/img/types/grass.png",
  normal:  "../src/img/types/normal.png",
  fighting:  "../src/img/types/fighting.png",
  flying:  "../src/img/types/flying.png",
  poison:  "../src/img/types/poison.png",
  ground:  "../src/img/types/ground.png",
  rock:  "../src/img/types/rock.png",
  bug:  "../src/img/types/bug.png",
  ghost:  "../src/img/types/ghost.png",
  steel:  "../src/img/types/steel.png",
  fire:  "../src/img/types/fire.png",
  water:  "../src/img/types/water.png",
  electric:  "../src/img/types/electric.png",
  psychic:  "../src/img/types/psychic.png",
  ice:  "../src/img/types/ice.png",
  dragon:  "../src/img/types/dragon.png",
  dark:  "../src/img/types/dark.png",
  fairy:  "../src/img/types/fairy.png",
  unknow:  "../src/img/types/uknow.png",
  shadow:  "../src/img/types/shadow.png",
}

console.log(imgByType);

const ColorbyStat = {
    HP: "[&>div]:bg-red-500 bg-slate-100",
    ATK: "[&>div]:bg-orange-500 bg-slate-100",
    DEF: "[&>div]:bg-yellow-500 bg-slate-100",
    SPA: "[&>div]:bg-blue-500 bg-slate-100",
    SPD: "[&>div]:bg-green-500 bg-slate-100",
    SPED: "[&>div]:bg-pink-500 bg-slate-100",
    TOT: "[&>div]:bg-blue-500 bg-blue-300",
  }

export {colorByType, ColorbyStat, imgByType}