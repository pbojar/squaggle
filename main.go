package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type apiConfig struct {
	filepathRoot string
	port         string
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Printf("warning: assuming default configuration. .env unreadable: %v", err)
	}

	filepathRoot := os.Getenv("FILEPATH_ROOT")
	if filepathRoot == "" {
		filepathRoot = "./app"
		log.Printf("FILEPATH_ROOT environment variable is not set, using default: %s", filepathRoot)
	}

	platform := os.Getenv("PLATFORM")
	if platform == "" {
		platform = "user"
		log.Printf("PLATFORM environment variable is not set, using default: %s", platform)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("PORT environment variable is not set, using default: %s", port)
	}

	cfg := apiConfig{
		filepathRoot: filepathRoot,
		port:         port,
	}

	mux := http.NewServeMux()
	appHandler := http.StripPrefix("/app", http.FileServer(http.Dir(cfg.filepathRoot)))
	mux.Handle("/app/", appHandler)

	srv := &http.Server{
		Addr:    ":" + cfg.port,
		Handler: mux,
	}

	log.Printf("Serving on: http://localhost:%s/app/\n", port)
	log.Fatal(srv.ListenAndServe())
}
