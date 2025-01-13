import { ID_GENERATOR_STRING } from "@/constants";

export const idGenerator = ()=>{
    let id: string = "";

    for(let i = 0; i < 10; i++){
        let idCharacter = ID_GENERATOR_STRING[Math.floor(Math.random()*61)];
        id += idCharacter
    }
    return id;
}