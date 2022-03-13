import sprites from "./sprites.js";
import { contexto } from "./canvas.js";

class BtnRepetir  {
    spriteX =  110
    spriteY = 109
    largura = 205
    altura = 66
    x= 300
    y= 120
    desenha(){
        contexto.drawImage(
        sprites,
           this.spriteX,this.spriteY, 
           this.largura,this.altura, 
           this.x,this.y, 
           this.largura,this.altura
        )
    }
}

export default new BtnRepetir();
