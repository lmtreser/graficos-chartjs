void setup() {
  Serial.begin(9600);
}

void loop() {
  
   Serial.println(random(0,50));
   delay(1000);
}
