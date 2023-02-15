package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org//mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo"
)

var collection *mongo.Collection

// initializing func
func init() {
	loadTheEnv()
	createDBInstance()
}
func loadTheEnv() {
	err := godotenv.Load(".env")
	// error handler
	if err != nil {
		log.Fatal("error loading the .env file")
	}
}
func createDBInstance() {
	// connection string
	connetionString := os.Getenv("DB_URI")
	dbName := os.Getenv("DB_NAME")
	collName := os.Getenv("DB_COLLECTION_NAME")
	clientOptions := options.Client().ApplyURL(connetionString)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("connected to mongodb!")
	collection = client.Database(dbName).Collection(collName)
	fmt.Println("collection instance created")
}

// get all func
func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := GetAllTasks()
	json.NewEncoder(w).Encode(payload)
}

// create func

func CreateTask() {

}

// task complete func
func TaskComplete() {

}

// task undo func
func UndoTask() {

}

// delete task func
func DeleteTask() {

}

// delete all task func
func deleteAllTasks() {

}
