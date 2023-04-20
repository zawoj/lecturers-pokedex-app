# NativeBase TypeScript Expo Template

The official NativeBase TypeScript template for [Expo](https://docs.expo.io/)

## Usage

```sh
expo init my-app --template @native-base/expo-template-typescript
```
#include <Servo.h>

#include "Wheels.h"
// piny dla sonaru (HC-SR04)
#define TRIG A4
#define ECHO A5

// pin kontroli serwo (musi być PWM)
#define SERVO 11

Servo serwo;

Wheels w;
void setup() {
  w.attach(4,5,3,9,8,10);
  
  w.setSpeed(200);
  
  w.forward();
     
  pinMode(TRIG, OUTPUT);    // TRIG startuje sonar
  pinMode(ECHO, INPUT);     // ECHO odbiera powracający impuls

  Serial.begin(9600);

  serwo.attach(SERVO);
  //
/* patrz przed siebie */
  serwo.write(90);

}

void loop(){
    
    //unsigned int dist;
    //dist = getDistance();
    
    //delay(10);  
    //Serial.print("Dystans: ");
    //Serial.println(dist);
    //if(dist < 40){
    //  Serial.println("STOP");
    //  w.stop();
    // }else{
    //  Serial.println("go");
    //  w.forward(); 
    // }
  }

void lookAndTellDistance(byte angle) {
  
  unsigned long tot;      // czas powrotu (time-of-travel)
  unsigned int distance;

  Serial.print("Patrzę w kącie ");
  Serial.print(angle);
  serwo.write(angle);
  
/* uruchamia sonar (puls 10 ms na `TRIGGER')
 * oczekuje na powrotny sygnał i aktualizuje
 */
  digitalWrite(TRIG, HIGH);
  delay(10);
  digitalWrite(TRIG, LOW);
  tot = pulseIn(ECHO, HIGH);

/* prędkość dźwięku = 340m/s => 1 cm w 29 mikrosekund
 * droga tam i z powrotem, zatem:
 */
  distance = tot/58;

  Serial.print(": widzę coś w odległości ");
  Serial.println(distance);
}

int getDistance() {
  unsigned long tot;      // czas powrotu (time-of-travel)
  unsigned int distance;
  
/* uruchamia sonar (puls 10 ms na `TRIGGER')
 * oczekuje na powrotny sygnał i aktualizuje
 */
  digitalWrite(TRIG, HIGH);
  delay(10);
  digitalWrite(TRIG, LOW);
  tot = pulseIn(ECHO, HIGH);

/* prędkość dźwięku = 340m/s => 1 cm w 29 mikrosekund
 * droga tam i z powrotem, zatem:
 */
  distance = tot/58;

  return distance;
}
