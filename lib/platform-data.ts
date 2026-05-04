export type RobotLevel = "beginner" | "intermediate" | "advanced";

export interface RobotManual {
  id: string;
  icon: string;
  name: string;
  level: RobotLevel;
  desc: string;
  budget: string;
  time: string;
  difficulty: string;
  components: string[];
  code: string;
  bangla: string;
  viva: string[];
}

export const ROBOTS: RobotManual[] = [
  {
    id: "line-follower",
    icon: "〰️",
    name: "Line Follower Robot",
    level: "beginner",
    desc: "IR sensors + motor driver follow black/white lines autonomously at high speed",
    budget: "৳800–1,200",
    time: "2–3 days",
    difficulty: "3/10",
    components: ["Arduino Uno", "IR Sensor Module ×2", "L298N Motor Driver", "DC Motors ×2", "Wheels ×2", "9V Battery", "Chassis", "Jumper Wires"],
    code: `// NexInnovator — Line Follower Robot v1.0
#define LEFT_IR   2
#define RIGHT_IR  3
#define ENA       9
#define IN1       4
#define IN2       5
#define ENB      10
#define IN3       6
#define IN4       7

const int SPEED      = 180;
const int TURN_SPEED = 120;

void setup() {
  pinMode(LEFT_IR, INPUT);
  pinMode(RIGHT_IR, INPUT);
  for (int p : {ENA,IN1,IN2,ENB,IN3,IN4}) pinMode(p, OUTPUT);
  Serial.begin(9600);
  Serial.println("NexInnovator Line Follower Ready!");
}

void loop() {
  bool left  = !digitalRead(LEFT_IR);
  bool right = !digitalRead(RIGHT_IR);
  if  (left && right)  moveForward();
  else if (left)       turnLeft();
  else if (right)      turnRight();
  else                 stopMotors();
}

void moveForward() {
  digitalWrite(IN1,HIGH); digitalWrite(IN2,LOW);
  digitalWrite(IN3,HIGH); digitalWrite(IN4,LOW);
  analogWrite(ENA,SPEED); analogWrite(ENB,SPEED);
}
void turnLeft() {
  digitalWrite(IN1,LOW);  digitalWrite(IN2,HIGH);
  digitalWrite(IN3,HIGH); digitalWrite(IN4,LOW);
  analogWrite(ENA,TURN_SPEED); analogWrite(ENB,SPEED);
}
void turnRight() {
  digitalWrite(IN1,HIGH); digitalWrite(IN2,LOW);
  digitalWrite(IN3,LOW);  digitalWrite(IN4,HIGH);
  analogWrite(ENA,SPEED); analogWrite(ENB,TURN_SPEED);
}
void stopMotors() { analogWrite(ENA,0); analogWrite(ENB,0); }`,
    bangla: "লাইন ফলোয়ার রোবট দুটি IR সেন্সর দিয়ে কালো লাইন শনাক্ত করে। বাম সেন্সর লাইনে থাকলে বাঁয়ে ঘোরে। ডান সেন্সর লাইনে থাকলে ডানে ঘোরে।",
    viva: ["What is the working principle of an IR sensor?","Why do we use PWM for motor speed control?","How does the L298N H-bridge work?","What is the difference between analog and digital IR sensors?","How do you calibrate IR sensors for different surfaces?"],
  },
  {
    id: "obstacle-avoider",
    icon: "🚧",
    name: "Obstacle Avoiding Robot",
    level: "beginner",
    desc: "HC-SR04 ultrasonic scanning + servo head steers around any obstacle automatically",
    budget: "৳900–1,400",
    time: "2–4 days",
    difficulty: "4/10",
    components: ["Arduino Uno", "HC-SR04 Ultrasonic", "SG90 Servo Motor", "L298N Motor Driver", "DC Motors ×2", "Chassis", "9V Battery"],
    code: `// NexInnovator — Obstacle Avoiding Robot v1.0
#include <Servo.h>
#define TRIG   9
#define ECHO  10
#define IN1    4
#define IN2    5
#define IN3    6
#define IN4    7
#define ENA    3
#define ENB   11

Servo scanServo;
const int SAFE_DIST = 25;

long getDistance() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  return pulseIn(ECHO, HIGH) * 0.034 / 2;
}

void setup() {
  pinMode(TRIG,OUTPUT); pinMode(ECHO,INPUT);
  for(int p:{IN1,IN2,IN3,IN4,ENA,ENB}) pinMode(p,OUTPUT);
  scanServo.attach(8);
  scanServo.write(90); delay(500);
}

void loop() {
  if (getDistance() > SAFE_DIST) { moveForward(); return; }
  stopMotors(); delay(300);
  scanServo.write(30);  delay(600);
  long rightDist = getDistance();
  scanServo.write(150); delay(600);
  long leftDist  = getDistance();
  scanServo.write(90);  delay(300);
  if (leftDist > rightDist) { turnLeft(); delay(400); }
  else                      { turnRight(); delay(400); }
}

void moveForward(){ digitalWrite(IN1,HIGH);digitalWrite(IN2,LOW);digitalWrite(IN3,HIGH);digitalWrite(IN4,LOW);analogWrite(ENA,180);analogWrite(ENB,180); }
void turnLeft(){    digitalWrite(IN1,LOW); digitalWrite(IN2,HIGH);digitalWrite(IN3,HIGH);digitalWrite(IN4,LOW);analogWrite(ENA,150);analogWrite(ENB,150); }
void turnRight(){   digitalWrite(IN1,HIGH);digitalWrite(IN2,LOW); digitalWrite(IN3,LOW); digitalWrite(IN4,HIGH);analogWrite(ENA,150);analogWrite(ENB,150); }
void stopMotors(){  analogWrite(ENA,0); analogWrite(ENB,0); }`,
    bangla: "অবস্টাকল অ্যাভয়েডিং রোবট আল্ট্রাসোনিক সেন্সর দিয়ে সামনের দূরত্ব মাপে। বাধা পেলে থামে। সার্ভো মোটর দিয়ে বাম-ডান স্ক্যান করে।",
    viva: ["How does HC-SR04 measure distance using sound?","Why use a servo for scanning instead of two sensors?","What is pulseIn() and why is it used?","Calculate distance if echo time is 2000µs.","What is the minimum detectable distance for HC-SR04?"],
  },
  {
    id: "bluetooth-robot",
    icon: "📱",
    name: "Bluetooth Controlled Robot",
    level: "beginner",
    desc: "HC-05 Bluetooth module receives smartphone commands — full 4-directional control",
    budget: "৳1,000–1,500",
    time: "3–4 days",
    difficulty: "4/10",
    components: ["Arduino Uno", "HC-05 Bluetooth", "L298N Motor Driver", "DC Motors ×2", "Chassis", "9V Battery", "Smartphone"],
    code: `// NexInnovator — Bluetooth Robot v1.0
#define IN1 2
#define IN2 3
#define IN3 4
#define IN4 5
#define ENA 9
#define ENB 10

void setup() {
  Serial.begin(9600);
  for(int p:{IN1,IN2,IN3,IN4,ENA,ENB}) pinMode(p,OUTPUT);
  analogWrite(ENA,200); analogWrite(ENB,200);
}

void loop() {
  if (!Serial.available()) return;
  char cmd = Serial.read();
  switch(cmd) {
    case 'F': moveForward(); break;
    case 'B': moveBack();    break;
    case 'L': turnLeft();    break;
    case 'R': turnRight();   break;
    case 'S': stopMotors();  break;
  }
}

void moveForward(){ digitalWrite(IN1,HIGH);digitalWrite(IN2,LOW);digitalWrite(IN3,HIGH);digitalWrite(IN4,LOW); }
void moveBack(){    digitalWrite(IN1,LOW); digitalWrite(IN2,HIGH);digitalWrite(IN3,LOW); digitalWrite(IN4,HIGH); }
void turnLeft(){    digitalWrite(IN1,LOW); digitalWrite(IN2,HIGH);digitalWrite(IN3,HIGH);digitalWrite(IN4,LOW); }
void turnRight(){   digitalWrite(IN1,HIGH);digitalWrite(IN2,LOW); digitalWrite(IN3,LOW); digitalWrite(IN4,HIGH); }
void stopMotors(){  analogWrite(ENA,0); analogWrite(ENB,0); }`,
    bangla: "ব্লুটুথ রোবট স্মার্টফোন থেকে কমান্ড নেয়। HC-05 মডিউল সিরিয়াল যোগাযোগ করে। F = সামনে, B = পেছনে, L = বাঁয়ে, R = ডানে।",
    viva: ["What UART baud rate does HC-05 use by default?","How do you pair HC-05 with a smartphone?","Difference between HC-05 and HC-06?","What is the range of Bluetooth 2.0?","How do you change HC-05 baud rate using AT commands?"],
  },
  {
    id: "fire-fighter",
    icon: "🔥",
    name: "Fire Fighting Robot",
    level: "beginner",
    desc: "3 flame IR sensors navigate toward fire — relay-driven water pump extinguishes it",
    budget: "৳1,500–2,200",
    time: "4–5 days",
    difficulty: "5/10",
    components: ["Arduino Uno", "IR Flame Sensors ×3", "L298N Motor Driver", "Mini Water Pump", "Relay Module", "Water Tank", "Tubing"],
    code: `// NexInnovator — Fire Fighter Robot v1.0
#define FLAME_L  2
#define FLAME_F  3
#define FLAME_R  4
#define PUMP     8

void setup() {
  pinMode(FLAME_L,INPUT); pinMode(FLAME_F,INPUT); pinMode(FLAME_R,INPUT);
  pinMode(PUMP,OUTPUT);
}

void loop() {
  bool fl = !digitalRead(FLAME_L);
  bool ff = !digitalRead(FLAME_F);
  bool fr = !digitalRead(FLAME_R);
  if (ff)            { stopMotors(); extinguish(); }
  else if (fl && !fr){ turnLeft(); pump(false); }
  else if (fr && !fl){ turnRight(); pump(false); }
  else               { moveForward(); pump(false); }
}

void extinguish() { pump(true); delay(3000); pump(false); }
void pump(bool on) { digitalWrite(PUMP, on ? HIGH : LOW); }`,
    bangla: "আগুন নেভানো রোবট তিনটি IR ফ্লেম সেন্সর ব্যবহার করে। সামনে আগুন পেলে থামে এবং পাম্প চালু করে।",
    viva: ["What wavelength does an IR flame sensor detect?","Why use a relay module for the pump?","How do you prevent water from damaging electronics?","What is the detection angle of a flame sensor?","How would you add an alarm buzzer?"],
  },
  {
    id: "smart-dustbin",
    icon: "🗑️",
    name: "Smart Dustbin Robot",
    level: "beginner",
    desc: "Ultrasonic proximity detection automatically opens lid — touchless hygienic operation",
    budget: "৳700–1,000",
    time: "1–2 days",
    difficulty: "2/10",
    components: ["Arduino Uno", "HC-SR04 Ultrasonic", "SG90 Servo Motor", "Dustbin", "9V Battery"],
    code: `// NexInnovator — Smart Dustbin v1.0
#include <Servo.h>
#define TRIG 9
#define ECHO 10

Servo lid;
bool isOpen = false;
unsigned long openTime = 0;
const int DETECT_DIST = 15;
const int OPEN_DURATION = 3000;

long getDistance() {
  digitalWrite(TRIG,LOW); delayMicroseconds(2);
  digitalWrite(TRIG,HIGH); delayMicroseconds(10);
  digitalWrite(TRIG,LOW);
  return pulseIn(ECHO,HIGH) * 0.034 / 2;
}

void setup() {
  pinMode(TRIG,OUTPUT); pinMode(ECHO,INPUT);
  lid.attach(6); lid.write(0);
}

void loop() {
  long dist = getDistance();
  if (dist < DETECT_DIST && !isOpen) {
    lid.write(90); isOpen = true; openTime = millis();
  }
  if (isOpen && millis() - openTime > OPEN_DURATION) {
    lid.write(0); isOpen = false;
  }
  delay(100);
}`,
    bangla: "স্মার্ট ডাস্টবিন হাত কাছে আসলে ঢাকনা খোলে। আল্ট্রাসোনিক সেন্সর ১৫ সেমি দূরত্ব মাপে। ৩ সেকেন্ড পর স্বয়ংক্রিয়ভাবে বন্ধ হয়।",
    viva: ["Why use millis() instead of delay() here?","What is the advantage of non-blocking code?","How would you add a fill-level sensor?","What servo angle represents open vs closed?","How would you add WiFi alerts?"],
  },
  {
    id: "light-follower",
    icon: "💡",
    name: "Light Following Robot",
    level: "beginner",
    desc: "LDR photoresistor pair tracks the brightest light source and follows it precisely",
    budget: "৳600–900",
    time: "2–3 days",
    difficulty: "3/10",
    components: ["Arduino Uno", "LDR Photoresistor ×2", "10kΩ Resistors ×2", "L298N Motor Driver", "DC Motors ×2"],
    code: `// NexInnovator — Light Follower Robot v1.0
#define LDR_L A0
#define LDR_R A1
#define THRESHOLD 50

void setup() { Serial.begin(9600); }

void loop() {
  int leftVal  = analogRead(LDR_L);
  int rightVal = analogRead(LDR_R);
  int diff = leftVal - rightVal;
  if (abs(diff) < THRESHOLD) moveForward();
  else if (diff > 0)         turnLeft();
  else                       turnRight();
  delay(50);
}`,
    bangla: "আলো অনুসরণকারী রোবট LDR সেন্সর ব্যবহার করে। বেশি আলো যেদিকে সেদিকে ঘোরে।",
    viva: ["What is an LDR and how does it work?","How do you create a voltage divider with LDR?","Why use analogRead instead of digitalRead?","How does light intensity affect LDR resistance?","How would you modify this to avoid light instead of follow it?"],
  },
  {
    id: "maze-solver",
    icon: "🌀",
    name: "Maze Solving Robot",
    level: "beginner",
    desc: "Left-hand rule wall-following algorithm autonomously navigates any maze",
    budget: "৳1,200–1,800",
    time: "4–6 days",
    difficulty: "6/10",
    components: ["Arduino Uno", "IR Sensors ×3 (L/F/R)", "L298N Motor Driver", "DC Motors ×2", "Chassis"],
    code: `// NexInnovator — Maze Solver v1.0
// Left-Hand Rule algorithm
#define IR_L 2
#define IR_F 3
#define IR_R 4

void setup() {
  pinMode(IR_L,INPUT); pinMode(IR_F,INPUT); pinMode(IR_R,INPUT);
}

void loop() {
  bool wallL = !digitalRead(IR_L);
  bool wallF = !digitalRead(IR_F);
  bool wallR = !digitalRead(IR_R);
  if (!wallL)      { turnLeft(); delay(400); }
  else if (!wallF) { moveForward(); }
  else if (!wallR) { turnRight(); delay(400); }
  else             { turnRight(); delay(800); }
}`,
    bangla: "মেজ সলভিং রোবট বাম-হাত নিয়ম ব্যবহার করে। বামে পথ থাকলে বাঁয়ে যায়।",
    viva: ["What is the left-hand rule algorithm?","Does left-hand rule work for all maze types?","What is a dead end and how to handle it?","How would you implement Flood Fill algorithm?","Difference between wall-following and shortest path algorithms?"],
  },
  {
    id: "voice-robot",
    icon: "🎙️",
    name: "Voice Controlled Robot",
    level: "beginner",
    desc: "Google Speech Recognition + Bluetooth sends voice commands in English and Bangla",
    budget: "৳1,200–1,800",
    time: "3–5 days",
    difficulty: "5/10",
    components: ["Arduino Uno", "HC-05 Bluetooth", "Android Phone", "L298N Motor Driver", "DC Motors ×2"],
    code: `// NexInnovator — Voice Robot (Arduino side)
void setup() { Serial.begin(9600); }

void loop() {
  if (Serial.available()) {
    String voice = Serial.readString();
    voice.toLowerCase(); voice.trim();
    if      (voice.indexOf("forward") >= 0 || voice.indexOf("সামনে") >= 0) moveForward();
    else if (voice.indexOf("back")    >= 0 || voice.indexOf("পেছনে") >= 0) moveBack();
    else if (voice.indexOf("left")    >= 0 || voice.indexOf("বাঁয়ে") >= 0) turnLeft();
    else if (voice.indexOf("right")   >= 0 || voice.indexOf("ডানে")  >= 0) turnRight();
    else if (voice.indexOf("stop")    >= 0 || voice.indexOf("থামো")  >= 0) stopMotors();
  }
}`,
    bangla: "ভয়েস রোবট বাংলা ও ইংরেজি কণ্ঠ কমান্ড বোঝে। Android অ্যাপ Google Speech API ব্যবহার করে।",
    viva: ["How does Google Speech Recognition work?","What is text-to-speech (TTS)?","How does Bluetooth serial communication work?","Why use String.indexOf() instead of ==?","How to add more Bangla command words?"],
  },
  {
    id: "robotic-arm",
    icon: "🦾",
    name: "Robotic Arm (6-DOF)",
    level: "intermediate",
    desc: "Six servo joints with PCA9685 driver — joystick or app controlled with position memory",
    budget: "৳2,500–4,000",
    time: "1–2 weeks",
    difficulty: "7/10",
    components: ["Arduino Mega", "MG996R Servo ×6", "PCA9685 Servo Driver", "PS2 Joystick ×2", "12V Power Supply", "3D Printed Arm"],
    code: `// NexInnovator — Robotic Arm 6-DOF v1.0
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
#define SERVOMIN 150
#define SERVOMAX 600
#define NUM_JOINTS 6

int joints[NUM_JOINTS] = {90,90,90,90,90,90};

int angleToPulse(int angle) {
  return map(angle, 0, 180, SERVOMIN, SERVOMAX);
}

void setJoint(int j, int angle) {
  joints[j] = constrain(angle, 5, 175);
  pwm.setPWM(j, 0, angleToPulse(joints[j]));
}

void setup() {
  Wire.begin(); pwm.begin(); pwm.setPWMFreq(50);
  for(int i=0;i<NUM_JOINTS;i++) setJoint(i,90);
  delay(1000);
}

void loop() {
  int joy1X = analogRead(A0), joy1Y = analogRead(A1);
  int joy2X = analogRead(A2), joy2Y = analogRead(A3);
  if (joy1X > 600) setJoint(0,joints[0]+1);
  if (joy1X < 400) setJoint(0,joints[0]-1);
  if (joy1Y > 600) setJoint(1,joints[1]+1);
  if (joy1Y < 400) setJoint(1,joints[1]-1);
  delay(20);
}`,
    bangla: "রোবোটিক আর্ম ৬টি সার্ভো মোটর দিয়ে কাজ করে। PCA9685 বোর্ড I2C দিয়ে নিয়ন্ত্রণ করে।",
    viva: ["What is DOF (Degrees of Freedom)?","How does inverse kinematics work?","Why use PCA9685 instead of direct Arduino PWM?","What torque is needed for each joint?","Explain forward vs inverse kinematics."],
  },
  {
    id: "gesture-robot",
    icon: "🤚",
    name: "Gesture Controlled Robot",
    level: "intermediate",
    desc: "MPU-6050 IMU reads hand tilt — NRF24L01 transmits wirelessly to robot receiver",
    budget: "৳1,800–2,500",
    time: "5–7 days",
    difficulty: "7/10",
    components: ["Arduino Uno ×2", "MPU-6050 IMU", "NRF24L01 Radio ×2", "L298N Motor Driver", "DC Motors ×2"],
    code: `// NexInnovator — Gesture Robot (Transmitter)
#include <Wire.h>
#include <MPU6050.h>
#include <SPI.h>
#include <RF24.h>

MPU6050 mpu;
RF24 radio(9,10);
const byte addr[6] = "00001";

void setup() {
  Wire.begin(); mpu.initialize();
  radio.begin(); radio.openWritingPipe(addr);
  radio.setPALevel(RF24_PA_LOW);
  radio.stopListening();
}

void loop() {
  int16_t ax,ay,az,gx,gy,gz;
  mpu.getMotion6(&ax,&ay,&az,&gx,&gy,&gz);
  float pitch = atan2(ay,az)*180.0/PI;
  float roll  = atan2(ax,az)*180.0/PI;
  char cmd = 'S';
  if      (pitch >  20) cmd = 'F';
  else if (pitch < -20) cmd = 'B';
  else if (roll  >  20) cmd = 'R';
  else if (roll  < -20) cmd = 'L';
  radio.write(&cmd, sizeof(cmd));
  delay(50);
}`,
    bangla: "জেশ্চার রোবট হাতের কাত বোঝে। MPU-6050 ত্বরণ মাপে। NRF24L01 ওয়্যারলেস ডেটা পাঠায়।",
    viva: ["What is an IMU and what does it measure?","How do you calculate pitch and roll from accelerometer?","What frequency does NRF24L01 operate at?","Why use atan2() instead of atan()?","How do you reduce noise in IMU readings?"],
  },
  {
    id: "home-automation",
    icon: "🏠",
    name: "Home Automation System",
    level: "intermediate",
    desc: "ESP8266 WiFi web server — control lights, fans, AC from any device on your network",
    budget: "৳1,500–2,500",
    time: "1 week",
    difficulty: "6/10",
    components: ["ESP8266 NodeMCU", "Relay Module 4-ch", "DHT22 Sensor", "PIR Motion Sensor", "5V Power Supply"],
    code: `// NexInnovator — Home Automation v1.0
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>

const char* SSID = "YOUR_WIFI_NAME";
const char* PASS = "YOUR_WIFI_PASSWORD";

ESP8266WebServer server(80);
DHT dht(D4, DHT22);
#define RELAY1 D0
bool states[4] = {false,false,false,false};

void handleAPI() {
  int idx = server.arg("device").toInt();
  bool on = server.arg("state") == "on";
  if (idx >= 0 && idx < 4) states[idx] = on;
  server.send(200,"application/json",
    "{\"temp\":"+String(dht.readTemperature())+
    ",\"humidity\":"+String(dht.readHumidity())+"}");
}

void setup() {
  WiFi.begin(SSID,PASS);
  while(WiFi.status()!=WL_CONNECTED) delay(500);
  server.on("/api",handleAPI);
  server.begin(); dht.begin();
}

void loop() { server.handleClient(); }`,
    bangla: "হোম অটোমেশন ESP8266 দিয়ে WiFi সার্ভার চালায়। স্মার্টফোন থেকে আলো, ফ্যান চালু/বন্ধ করা যায়।",
    viva: ["What is REST API?","How does ESP8266 connect to WiFi?","Why is relay HIGH = OFF in most modules?","How would you add a mobile app?","What is MQTT and how does it differ from HTTP?"],
  },
  {
    id: "face-detection",
    icon: "😊",
    name: "Face Detection Robot",
    level: "intermediate",
    desc: "Haar cascade face recognition — pan/tilt servo tracks face and maintains optimal distance",
    budget: "৳5,000–8,000",
    time: "2–3 weeks",
    difficulty: "8/10",
    components: ["Raspberry Pi 4", "Pi Camera", "Pan-Tilt Servo Kit", "L298N Motor Driver", "DC Motors ×2"],
    code: `# NexInnovator — Face Detection Robot
import cv2, serial

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
arduino = serial.Serial('/dev/ttyACM0', 9600)
cap = cv2.VideoCapture(0)
W, H = 640, 480
cap.set(3, W); cap.set(4, H)
CX = W//2
DEAD_ZONE = 40

while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 5, minSize=(80,80))
    for (x,y,w,h) in faces[:1]:
        fcx = x+w//2
        cmd = ""
        if   fcx < CX - DEAD_ZONE: cmd = "L"
        elif fcx > CX + DEAD_ZONE: cmd = "R"
        else:                       cmd = "S"
        arduino.write((cmd+"\\n").encode())
        cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,0),2)
    cv2.imshow('Face Robot',frame)
    if cv2.waitKey(1)==ord('q'): break`,
    bangla: "ফেস ডিটেকশন রোবট Haar Cascade দিয়ে মুখ চেনে। সার্ভো মুখের দিকে ক্যামেরা ঘোরায়।",
    viva: ["What is Haar Cascade classifier?","How does face detection differ from recognition?","What is the dead zone in tracking?","How do you track multiple faces?","What is dlib and how is it better than Haar cascades?"],
  },
  {
    id: "humanoid",
    icon: "🦿",
    name: "Humanoid Robot",
    level: "advanced",
    desc: "18-DOF bipedal walking with sinusoidal gait, ZMP balance, and IMU feedback loop",
    budget: "৳15,000–30,000",
    time: "1–2 months",
    difficulty: "10/10",
    components: ["Arduino Mega", "Raspberry Pi 4", "MG996R Servos ×18", "MPU-6050 IMU", "LiPo 7.4V 5000mAh", "3D Printed Body", "PCA9685 ×2"],
    code: `// NexInnovator — Humanoid Gait Engine v1.0
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include <MPU6050.h>

Adafruit_PWMServoDriver pwm1 = Adafruit_PWMServoDriver(0x40);
Adafruit_PWMServoDriver pwm2 = Adafruit_PWMServoDriver(0x41);
MPU6050 imu;

float phase = 0;
const float STEP = 0.05f;
const float AMPLITUDE = 20.0f;

void setServo(int board, int ch, float deg) {
  deg = constrain(deg, 5, 175);
  int pulse = map((int)deg, 0, 180, 150, 600);
  if (board==0) pwm1.setPWM(ch, 0, pulse);
  else          pwm2.setPWM(ch, 0, pulse);
}

void loop() {
  float lHip  = 90 + AMPLITUDE * sin(phase);
  float rHip  = 90 + AMPLITUDE * sin(phase + PI);
  setServo(0, 0, lHip); setServo(1, 0, rHip);
  phase += STEP;
  if (phase > TWO_PI) phase -= TWO_PI;
  delay(20);
}`,
    bangla: "হিউমানয়েড রোবট সাইনুসয়িডাল গেইট দিয়ে হাঁটে। ১৮টি সার্ভো মোটর সমন্বিতভাবে কাজ করে।",
    viva: ["What is ZMP (Zero Moment Point)?","Explain sinusoidal gait generation.","How does IMU feedback improve balance?","What is the difference between static and dynamic balance?","How many DOF minimum for bipedal walking?"],
  },
  {
    id: "ai-vision",
    icon: "👁️",
    name: "AI Vision Robot",
    level: "advanced",
    desc: "YOLOv8 real-time multi-class detection on Jetson Nano + ROS2 autonomous navigation",
    budget: "৳12,000–20,000",
    time: "1 month",
    difficulty: "10/10",
    components: ["NVIDIA Jetson Nano", "USB Camera 1080p", "ROS2 Humble", "LiDAR Lite v3", "DC Motors ×4"],
    code: `# NexInnovator — AI Vision Robot (ROS2 Node)
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from ultralytics import YOLO
import cv2

class AIVisionNode(Node):
    def __init__(self):
        super().__init__('ai_vision_node')
        self.model = YOLO('yolov8n.pt')
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        self.cap = cv2.VideoCapture(0)
        self.timer = self.create_timer(0.1, self.process)
        self.frame_w = 640

    def process(self):
        ret, frame = self.cap.read()
        if not ret: return
        results = self.model(frame, conf=0.5, verbose=False)
        twist = Twist()
        for box in results[0].boxes:
            label = results[0].names[int(box.cls)]
            x1,y1,x2,y2 = map(int, box.xyxy[0])
            cx = (x1+x2)//2
            err = (cx - self.frame_w//2) / (self.frame_w//2)
            if label == 'person':
                twist.angular.z = float(-0.6 * err)
                twist.linear.x  = 0.25 if abs(err)<0.25 else 0.0
                self.cmd_pub.publish(twist)

def main():
    rclpy.init()
    rclpy.spin(AIVisionNode())
    rclpy.shutdown()`,
    bangla: "AI ভিশন রোবট YOLOv8 দিয়ে রিয়েল-টাইমে বস্তু চেনে। Jetson Nano GPU-তে নিউরাল নেটওয়ার্ক চালানো হয়।",
    viva: ["What is YOLO and how does it work?","Difference between YOLOv8n vs YOLOv8x?","What is ROS2 and why use it?","What is the difference between Jetson Nano and Raspberry Pi?","How do you measure inference time (FPS)?"],
  },
  {
    id: "drone-system",
    icon: "🚁",
    name: "Drone Robotics System",
    level: "advanced",
    desc: "Autonomous quadcopter with GPS waypoints, altitude hold, FPV and return-to-home",
    budget: "৳12,000–25,000",
    time: "1–2 months",
    difficulty: "10/10",
    components: ["F450 Frame", "Pixhawk FC", "BLDC 2212 ×4", "30A ESC ×4", "LiPo 3S 5200mAh", "GPS M8N", "FPV Camera"],
    code: `# NexInnovator — Drone Waypoint Mission
from dronekit import connect, VehicleMode, LocationGlobalRelative
import time

vehicle = connect('/dev/ttyUSB0', baud=57600, wait_ready=True)

def arm_and_takeoff(target_alt):
    while not vehicle.is_armable:
        print("Waiting..."); time.sleep(1)
    vehicle.mode = VehicleMode("GUIDED")
    vehicle.armed = True
    vehicle.simple_takeoff(target_alt)

def goto(lat, lon, alt):
    vehicle.simple_goto(LocationGlobalRelative(lat, lon, alt), groundspeed=5)

arm_and_takeoff(10)
goto(23.8103, 90.4125, 10)
time.sleep(15)
vehicle.mode = VehicleMode("RTL")
vehicle.close()`,
    bangla: "ড্রোন চারটি ব্রাশলেস মোটর দিয়ে ওড়ে। Pixhawk PID দিয়ে স্থিতিশীলতা বজায় রাখে।",
    viva: ["What is ESC and how does it work?","How does Pixhawk achieve flight stability?","What is PID tuning in drone context?","What is MAVLink protocol?","How do you achieve GPS Hold?"],
  },
  {
    id: "mars-rover",
    icon: "🪐",
    name: "Mars Rover Model",
    level: "advanced",
    desc: "6-wheel rocker-bogie suspension navigates rocks — inspired by NASA Perseverance",
    budget: "৳10,000–20,000",
    time: "1–2 months",
    difficulty: "9/10",
    components: ["Raspberry Pi 4", "Arduino Mega", "DC Motors ×6", "Servo Steering ×4", "IMU", "Camera", "3D Printed Rocker-Bogie"],
    code: `// NexInnovator — Mars Rover Rocker-Bogie v1.0
#include <Servo.h>

Servo s_FL, s_FR, s_BL, s_BR;
const int DRV[6] = {3,5,6,9,10,11};
const int DIR[6] = {2,4,7,8,12,13};

void steerAngle(float angle) {
  float inner = constrain(angle*1.2f, -45, 45);
  float outer = constrain(angle*0.8f, -45, 45);
  s_FR.write(90+(int)inner); s_FL.write(90+(int)outer);
  s_BR.write(90-(int)inner); s_BL.write(90-(int)outer);
}

void driveAll(int speed, bool forward) {
  for (int i=0; i<6; i++) {
    digitalWrite(DIR[i], forward ? HIGH : LOW);
    analogWrite(DRV[i], abs(speed));
  }
}

void setup() {
  s_FL.attach(22); s_FR.attach(23);
  s_BL.attach(24); s_BR.attach(25);
}`,
    bangla: "মার্স রোভার রকার-বগি সাসপেনশন দিয়ে পাথর পেরোয়। NASA এর real রোভার থেকে অনুপ্রাণিত।",
    viva: ["What is rocker-bogie suspension?","Why does Mars Rover need 6 independent wheels?","What is Ackermann steering geometry?","How do you achieve passive suspension?","Why are the middle wheels not steered?"],
  },
  {
    id: "ai-assistant-robot",
    icon: "🤖",
    name: "Full AI Personal Assistant Robot",
    level: "advanced",
    desc: "Complete AI companion — vision, Bangla speech, emotion recognition, navigation, NLP",
    budget: "৳40,000–80,000",
    time: "3–6 months",
    difficulty: "10/10",
    components: ["NVIDIA Jetson Orin", "Raspberry Pi 4", "Servo Head/Neck", "7-Mic Array", "Speaker 10W", "LiDAR 360°"],
    code: `# NexInnovator — Full AI Robot
import anthropic, speech_recognition as sr, serial

class NexBotRobot:
    def __init__(self):
        self.client  = anthropic.Anthropic()
        self.sr      = sr.Recognizer()
        self.arduino = serial.Serial('/dev/ttyACM0', 9600)
        self.history = []

    def listen(self):
        with sr.Microphone() as mic:
            audio = self.sr.listen(mic, timeout=5)
        try:
            return self.sr.recognize_google(audio, language='bn-BD')
        except:
            try: return self.sr.recognize_google(audio, language='en-US')
            except: return None

    def think(self, user_input):
        self.history.append({"role":"user","content":user_input})
        resp = self.client.messages.create(
            model="claude-opus-4-5",
            max_tokens=300,
            system="You are NexBot — a friendly Bengali-English bilingual AI robot.",
            messages=self.history)
        reply = resp.content[0].text
        self.history.append({"role":"assistant","content":reply})
        return reply

    def speak(self, text):
        self.arduino.write(f"SPEAK:{text[:100]}\\n".encode())

    def run(self):
        while True:
            speech = self.listen()
            if speech:
                reply = self.think(speech)
                self.speak(reply)

NexBotRobot().run()`,
    bangla: "ফুল AI রোবট বাংলা ও ইংরেজিতে কথা বলে ও শোনে। Claude API দিয়ে বুদ্ধিমত্তা প্রয়োগ করে।",
    viva: ["What is multi-modal AI?","How do you integrate speech recognition with NLP?","What is the Anthropic Claude API?","How does emotion detection work?","What are the ethical considerations for AI robots?"],
  },
];

export const PROJECTS = {
  school: [
    "Traffic Light System","Auto Plant Watering Bot","Temperature Alarm",
    "Digital Dice","Distance Meter LCD","Intruder Alarm PIR",
    "LED Music Visualizer","Smart Nightlight LDR","Pet Auto Feeder RTC",
    "Weather Station DHT22","Lie Detector GSR","Musical Stairs IR",
  ],
  college: [
    "Smart Parking System","Gesture Air Piano","RFID Door Lock",
    "Gas Leak SMS Alert","Smart Trash Fill Monitor","Blind Navigation Stick",
    "ECG Heart Monitor","Earthquake Detector","Solar Panel Tracker",
    "2-Axis CNC Plotter","Water Quality IoT","Alcohol Breathalyzer",
  ],
  hackathon: [
    "AI Waste Sorter CV","Sign Language Glove","Pothole GPS Mapper",
    "Crop Disease Scanner TFLite","Flood Early Warning","EMG Prosthetic Hand",
    "Air Quality Drone Map","Emergency Defibrillator Drone","Blind Guide LiDAR Bot",
    "Ocean Plastic Collector","Earthquake Rescue Bot","Anti-Poaching Drone AI",
  ],
};

export const VOCAB_EN_BN: [string, string][] = [
  ["Microcontroller","মাইক্রোকন্ট্রোলার"],["Sensor","সেন্সর"],["Actuator","অ্যাকচুয়েটর"],
  ["Servo Motor","সার্ভো মোটর"],["Ultrasonic","আল্ট্রাসোনিক"],["IR Sensor","ইনফ্রারেড সেন্সর"],
  ["PWM","পালস উইদথ মড্যুলেশন"],["Breadboard","ব্রেডবোর্ড"],["Resistor","রেজিস্টর"],
  ["Capacitor","ক্যাপাসিটর"],["Voltage","ভোল্টেজ"],["Circuit","সার্কিট"],
  ["Algorithm","অ্যালগরিদম"],["Robot","রোবট"],["Autonomous","স্বায়ত্তশাসিত"],
  ["Motor Driver","মোটর ড্রাইভার"],["Bluetooth","ব্লুটুথ"],["Artificial Intelligence","কৃত্রিম বুদ্ধিমত্তা"],
  ["Machine Learning","মেশিন লার্নিং"],["Encoder","এনকোডার"],["Gyroscope","জাইরোস্কোপ"],
  ["Accelerometer","অ্যাক্সিলেরোমিটার"],["H-Bridge","এইচ-ব্রিজ"],["PID Control","পিআইডি নিয়ন্ত্রণ"],
  ["Inverse Kinematics","বিপরীত গতিবিদ্যা"],["Firmware","ফার্মওয়্যার"],["Calibration","ক্যালিব্রেশন"],
  ["Robotics","রোবোটিক্স"],["Engineering","প্রকৌশল"],["Electronics","ইলেকট্রনিক্স"],
];

export const CERT_QUESTIONS = {
  beginner: [
    { q: "What microcontroller chip is on Arduino Uno?", opts: ["ATmega328P","ATmega2560","ESP8266","STM32"], ans: 0 },
    { q: "Which pin type outputs variable voltage on Arduino?", opts: ["Digital","PWM","VCC","GND"], ans: 1 },
    { q: "A resistor's function is to:", opts: ["Store energy","Amplify signal","Oppose current","Convert AC-DC"], ans: 2 },
    { q: "HC-SR04 measures distance using:", opts: ["Light","Sound waves","Infrared","Radio"], ans: 1 },
    { q: "L298N is a type of:", opts: ["Sensor","Motor Driver","MCU","Battery"], ans: 1 },
  ],
  intermediate: [
    { q: "PID stands for:", opts: ["Power-Input-Digital","Proportional-Integral-Derivative","Position-Integral-Differential","None"], ans: 1 },
    { q: "I2C communication uses how many wires?", opts: ["1","2","4","8"], ans: 1 },
    { q: "Servo PWM frequency is typically:", opts: ["50Hz","500Hz","5kHz","50kHz"], ans: 0 },
    { q: "OpenCV is a library for:", opts: ["Motor control","Computer vision","Bluetooth","Database"], ans: 1 },
    { q: "MPU-6050 measures:", opts: ["Temperature","Distance","Acceleration+Gyro","Magnetic field"], ans: 2 },
  ],
  advanced: [
    { q: "YOLOv8 is used for:", opts: ["Database queries","Real-time object detection","Motor PID","Wireless protocol"], ans: 1 },
    { q: "ROS2 stands for:", opts: ["Robot Operating System 2","Remote Object Sensor","Robotic Output Signal","None"], ans: 0 },
    { q: "ZMP in bipedal robots stands for:", opts: ["Zero Moment Point","Zone Motor Protocol","Zenith Motion Path","None"], ans: 0 },
    { q: "ESC in drone context is:", opts: ["Emergency Stop Control","Electronic Speed Controller","Electrical Signal Conv.","None"], ans: 1 },
    { q: "Inverse Kinematics calculates:", opts: ["Joint angles from end-effector","End-effector from joint angles","Motor speed","Battery level"], ans: 0 },
  ],
};

export const NEWS = [
  { tag: "AI", title: "Boston Dynamics Atlas goes fully autonomous", body: "AI stack enables Atlas to complete multi-step tasks without human input — a new milestone in general-purpose robotics." },
  { tag: "ROBOTICS", title: "Bangladesh launches national Robotics Olympiad", body: "500+ schools participate in the first Bangladesh Robotics Olympiad — inspiring thousands of young engineers." },
  { tag: "EDU", title: "MIT releases open-source robotics curriculum", body: "MIT CSAIL publishes full course materials under Creative Commons, giving global students access to elite education." },
  { tag: "AI", title: "Figure 02 humanoid enters BMW manufacturing", body: "Figure AI and BMW deploy humanoid robots on production lines — the smart factory era is officially here." },
];

export const PLATFORM_STATS = [
  { value: "25+", label: "Robot Manuals", labelBn: "রোবট ম্যানুয়াল" },
  { value: "EN/BN", label: "Languages", labelBn: "ভাষা" },
  { value: "100%", label: "Free Forever", labelBn: "সম্পূর্ণ বিনামূল্যে" },
  { value: "∞", label: "Students Welcome", labelBn: "শিক্ষার্থী স্বাগত" },
];

export const ACHIEVEMENTS = [
  { id: "first_step", icon: "🌱", title: "First Step", desc: "Earn your first XP", xpThreshold: 1 },
  { id: "beginner", icon: "⚡", title: "Beginner", desc: "Reach 500 XP", xpThreshold: 500 },
  { id: "builder", icon: "🔧", title: "Builder", desc: "Reach 1000 XP", xpThreshold: 1000 },
  { id: "engineer", icon: "🏆", title: "Engineer", desc: "Reach 2500 XP", xpThreshold: 2500 },
  { id: "master", icon: "🚀", title: "Master", desc: "Reach 5000 XP", xpThreshold: 5000 },
  { id: "legend", icon: "👑", title: "Legend", desc: "Reach 10000 XP", xpThreshold: 10000 },
];
