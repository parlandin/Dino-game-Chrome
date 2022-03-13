let canvas = document.querySelector("#canvas")
let contexto = canvas.getContext("2d")

let frames = 0
let velocidade = 8

let num =parseInt(Math.random() * 5)

const sprites = new Image()
sprites.src = "./assets/knight-sprites3.png"

const somPulo = new Audio()
somPulo.src = "./assets/Audio/jump-small.wav"


let btnRepetir = {
    spriteX: 110,
    spriteY: 109,
    largura: 205,
    altura: 66,
    x: 300,
    y: 120,
    desenha(){
        contexto.drawImage(
            sprites,
            btnRepetir.spriteX, btnRepetir.spriteY, 
            btnRepetir.largura, btnRepetir.altura, 
            btnRepetir.x, btnRepetir.y, 
            btnRepetir.largura, btnRepetir.altura
        )
    }
}

let score = {
    desenha(){
        contexto.fillStyle = "#000"
        contexto.font = "20px Arial"
        contexto.fillText(dino.score, canvas.width - 100, 30)
        if(dino.melhorPontuacao != 0){
            contexto.fillStyle = "#000"
            contexto.font = "20px Arial"
            contexto.fillText("HI: "+ dino.melhorPontuacao, canvas.width - 200, 30)
        }
    }
}


let dino = {
    spriteX: 25,
    spriteY: 4,
    largura: 43,
    altura: 70,
    x: 40,
    y: 226,
    velocidade: 0,
    pulando: false,
    gravidade: 1.5,
    velocidade: 0,
    alturaPulo: 20,
    score: 0,
    melhorPontuacao: 0,

    atualiza(){
        this.velocidade += this.gravidade
        this.y += this.velocidade

        if(this.y >= 226){
            this.y = 226
            this.pulando = false
        }


        if(this.pulando){
            this.framePulo()
        }

        else if(!this.pulando){
            this.largura = 43
            this.atualizaFrameAtual()
            const {spriteX, spriteY} = this.movimentos[this.frameAtual]
            this.spriteX = spriteX 
            this.spriteY =  spriteY 
        }

        const valorScore = frames % 10 == 0
            if(valorScore){
                dino.score++
            }
    },

    pular(){
        if(!this.pulando){
            somPulo.play()
            this.pulando = true
            this.velocidade = -this.alturaPulo
        }
    },
    framePulo(){
        this.spriteX = 733
        this.spriteY = 0
        this.largura = 55
    },

    movimentos: [
        {spriteX: 102, spriteY: 4 },
        {spriteX: 184, spriteY: 4 },
        {spriteX: 260, spriteY: 4 },
        {spriteX: 342, spriteY: 4 },
    ],

    frameAtual: 0,
    atualizaFrameAtual(){
        const intervaloDeFrames = 4
        const passouOIntervalo = frames % intervaloDeFrames

        if(passouOIntervalo === 0){
            const baseDoIncremento = 1
            const incremento = baseDoIncremento + this.frameAtual
            const baseRepeticao = this.movimentos.length
            this.frameAtual = incremento % baseRepeticao
        }
    },
    desenha(){
        contexto.drawImage(
            sprites, 
            this.spriteX, this.spriteY,
            dino.largura, dino.altura, 
            dino.x, dino.y, 
            dino.largura, dino.altura
        )
    },
    spriteInicial(){
        this.spriteX = 25
        this.spriteY = 4
        this.largura = 40
        this.y = 226
    }
}


let chao = {
    spriteX: 120,
    spriteY: 205,
    largura: 766,
    altura: 23,
    x: 0,
    y: 280,
    atualiza(){
        const movimentoDoChao = 5
        const repetirEm = chao.largura / 1.2
        const movimentacao = chao.x - movimentoDoChao
        chao.x = movimentacao  % repetirEm 
    },
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura, 
            chao.x, chao.y, 
            chao.largura, chao.altura
        )
        contexto.drawImage(
            sprites,
            chao.spriteX , chao.spriteY, 
            chao.largura, chao.altura, 
            chao.x + chao.largura, chao.y, 
            chao.largura, chao.altura
        )
    }
}

let cactos = {
    listaDeCactos:[
        {
        spriteX: 627,
        spriteY: 111,
        largura: 45,
        altura: 52,
        x: 900,
        y: 241,
    },
    {
        spriteX: 578,
        spriteY: 111,
        largura: 24,
        altura: 50,
        x: 900,
        y: 241
    },
    {
        spriteX: 530,
        spriteY: 111,
        largura: 48,
        altura: 50,
        x: 900,
        y: 241
    },
    {
        spriteX: 431,
        spriteY: 111,
        largura: 62,
        altura: 37,
        x: 900,
        y: 258
    },
    {
        spriteX: 480,
        spriteY: 111,
        largura: 30,
        altura: 38,
        x: 900,
        y: 258
    },
    {
        spriteX: 512,
        spriteY: 111,
        largura: 16,
        altura: 38,
        x: 900,
        y: 258
    }
    ],
    gerarCactos:[/* { x: 900, randomCactos: 3} */],
    desenha(){
        cactos.gerarCactos.forEach(function(par){
            let i = par.randomCactos


            contexto.drawImage(
                sprites,
                cactos.listaDeCactos[i].spriteX,
                cactos.listaDeCactos[i].spriteY, 
                cactos.listaDeCactos[i].largura, 
                cactos.listaDeCactos[i].altura, 
                par.x, 
                cactos.listaDeCactos[i].y, 
                cactos.listaDeCactos[i].largura,
                cactos.listaDeCactos[i].altura
            )
            
        })

    }, 
    temColisao(par){
        let cactoLagura = cactos.listaDeCactos[par.randomCactos].largura 
        let cactoY  = cactos.listaDeCactos[par.randomCactos].y
        if(dino.x < par.x + cactoLagura && dino.x + dino.largura -4 >= par.x && dino.y + dino.altura -10 >= cactoY){
           return true

        }
    },
    tempoInserirCacto: 0,

    atualiza(){
        if(this.tempoInserirCacto == 0){
            this.tempoInserirCacto = 35 + Math.floor(Math.random() * 30)
            let randomCactos = parseInt(Math.random()* 6)
            cactos.gerarCactos.push({x:900, randomCactos})
        }
        else{
            this.tempoInserirCacto--
        } 

        cactos.gerarCactos.forEach(function(par){
            par.x -= velocidade            

            if(cactos.temColisao(par)){
                if(dino.score > dino.melhorPontuacao){
                    dino.melhorPontuacao = dino.score
                }
                mudarParaTela(Telas.REINICIAR)
            } 

            if(par.x + cactos.largura < 0){
                cactos.gerarCactos.shift()
            }
        })
        const aumentarVelocidade = frames % 600 == 0
            if(aumentarVelocidade){
                velocidade++
            }
    }
}




//
// Telas

let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela
}

const Telas = {
    INICIO: {
        desenha(){
            chao.desenha()
            dino.desenha()
        },

        keyup(){
            mudarParaTela(Telas.JOGO)
            dino.pular()
        },
        atualiza(){

        },
        click(){
            mudarParaTela(Telas.JOGO)
            dino.pular()
        }
    },

    JOGO: {
       keyup(){
            dino.pular()
        }, 
        desenha(){
            chao.desenha()
            cactos.desenha()
            dino.desenha()
            score.desenha()
        },

        atualiza(){
            dino.atualiza()
            chao.atualiza()
            cactos.atualiza()
        },
        click(){
            
            dino.pular()
        }
    },

    REINICIAR:{
        atualiza(){
        },
            
        desenha(){
            chao.desenha()
            cactos.desenha()
            dino.desenha()
            btnRepetir.desenha() 
        },
        click(){
            mudarParaTela(Telas.INICIO)
            cactos.gerarCactos = []
            velocidade = 8
            dino.spriteInicial()
            dino.score = 0
        }
    }
}




function loop() {
    contexto.clearRect(0,0,canvas.width,canvas.height)
    telaAtiva.atualiza()
    telaAtiva.desenha()
    /* dino.cair()
    dino.desenha()
    chao.desenha() */
    frames ++
    requestAnimationFrame(loop)
}

mudarParaTela(Telas.INICIO)
loop()

window.addEventListener("keydown", function(e){
   if(telaAtiva.keyup && e.keyCode == 38){
        telaAtiva.keyup() 
    }  

    /*
    if(e.keyCode == 38){
        dino.pular()
    }
    
     console.log(e.keyCode) */
})


window.addEventListener("click", function(e){
    if(telaAtiva.click){
        telaAtiva.click()
    }
    console.log(e.key)
})


