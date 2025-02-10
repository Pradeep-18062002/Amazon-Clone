/*class Car{

   #brand;
   #model;
   speed=0;
  isTrunkOpen;

  constructor(carDetails){

    this.#brand= carDetails.brand;
    this.#model= carDetails.model;
    this.isTrunkOpen=false;

  }

  displayInfo(){
    console.log(`${this.#brand} ${this.#model} ,speed: ${this.speed} km/h`);
  }

  go(){

    if(!this.isTrunkOpen){
    this.speed+=5;

    if(this.speed>200){
      this.speed=200;
    }
  }


  }

  brake(){


    this.speed-=5;
    if(this.speed<0){
      this.speed=0;
    }

  }


  openTrunk(){

    if(this.speed===0){
      this.isTrunkOpen=true;
    }
  }

  closeTrunk(){
    this.isTrunkOpen=false;
  }
}



const Objectcar1=new Car({brand : 'Toyota',model : 'Corolla'});

const Objectcar2=new Car({brand : 'Tesla',model : 'Model 3'});



//Objectcar1.displayInfo();
//Objectcar2.displayInfo();


Objectcar1.go();
Objectcar1.go();
Objectcar1.go();
Objectcar2.go();
Objectcar2.go();
Objectcar2.go();
Objectcar1.go();
Objectcar1.go();
Objectcar1.go();
Objectcar2.go();
Objectcar2.go();
Objectcar2.go();
Objectcar1.go();
Objectcar1.go();
Objectcar1.go();
Objectcar2.go();
Objectcar2.go();
Objectcar2.go();
Objectcar1.go();
Objectcar1.go();
Objectcar1.go();
Objectcar2.go();
Objectcar2.go();
Objectcar2.go();



Objectcar1.brake();
Objectcar1.brake();
Objectcar1.brake();
Objectcar2.brake();
Objectcar2.brake();
Objectcar2.brake();


Objectcar1.displayInfo();
Objectcar2.displayInfo();

//console.log(Objectcar1);
//console.log(Objectcar2);


class RaceCar extends Car{

  acceleration;

   constructor(carDetails){

    super(carDetails);
    this.acceleration=carDetails.acceleration;

  }

  go(){
    this.speed+=this.acceleration;

    if(this.speed>300){
      this.speed=300;
    }
  }

  openTrunk(){

    console.log(`Race Cars don't have a trunk`);
  }

  closeTrunk(){

    console.log(`Race cars don't have a trunk`);

  }


}

 const RaceCar1= new RaceCar({brand: 'McLaren',
  model: 'F1',
  acceleration: 20});

console.log(RaceCar1);

console.log("Before calling go:", RaceCar1.speed);

*/