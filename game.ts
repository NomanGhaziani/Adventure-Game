#!/usr/bin/env node
import * as readLine from "readline";
const rl = readLine .createInterface({
    input : process.stdin,
    output : process.stdout,
});
//Define a class representing a player
class Player{
    private name : string;
    private health : number;
    private energy : number;
    constructor(name : string){
        this.name = name;
        this.health = 100;
        this.energy = 100;
    }
    //method to get players name
    getName(): string {
        return this.name;
    }
    //method to get players health

    getHealth(): number {
        return this.health;
    }
    //method to get players energy
    getEnergy() : number {
        return this.energy;
    }
    //method to decereas players healt
    decreaseHealth(amount : number) : void{
        this.health -=amount;
        if(this.health <= 0){
            console.log(`${this.name} has been defeated! Game over.`);
            rl.close();
        }
        else{
            console.log(`${this.name}has ${this.health} health remaining.`);
        }
    }
    //method to decereas players energy
    decreaseEnergy(amount : number) : void{
        this.energy -=amount;
        if(this.energy <= 0){
            console.log(`${this.name} has run out of energy! Game over.`);
            rl.close();
        }
        else{
            console.log(`${this.name}has ${this.energy} energy remaining.`);
        }
    }
}
class Monster{
    private name : string;
    private health : number;
    constructor(name : string){
        this.name = name;
        this.health = 50;
    }
    getName(): string{
        return this.name;
    }
    getHealth(): number{
        return this.health;
    }
    attack(player :Player) : void {
        const damage = Math.floor(Math.random() * 10) + 1;
        console.log(`${this.name}attacks ${player.getName()}
        for${damage}damage.`,);
        player.decreaseHealth(damage);
    }
}
const player = new Player("Hero");
const monster = new Monster("Dragon");
console.log(`A wild ${monster.getName()}appears!`);
function battle(){
    rl.question("press enter to attack :", ()=>{
        const playerAttack = Math.floor(Math.random() * 20) + 1;
        const energyConsumption = Math.floor(Math.random() * 10) + 1;
        player .decreaseEnergy(energyConsumption);
        console.log(`${player.getName()}attacks
        ${monster.getName()} for${playerAttack}damage.`,);
        monster.attack(player);
        if(player.getHealth()> 0 && player.getEnergy()>0){
            console.log(`==================`);
            console.log(`Next round:`);
            console.log(`players Healt :${player.getHealth()}`);
            console.log(`players ENergy :${player.getEnergy()}`);
            console.log(`monsters Health :${monster.getHealth()}`);
            console.log(`================`);
            battle();
        }
        else{
            rl.close();
        }
    });
}
battle();