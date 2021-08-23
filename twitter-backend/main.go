package main

import (
	"os"

	"github.com/arman-aminian/twitter-backend/db"
	echoSwagger "github.com/swaggo/echo-swagger"

	_ "github.com/arman-aminian/twitter-backend/docs" // docs is generated by Swag CLI, you have to import it.
	"github.com/arman-aminian/twitter-backend/handler"
	"github.com/arman-aminian/twitter-backend/model"
	"github.com/arman-aminian/twitter-backend/router"
	"github.com/arman-aminian/twitter-backend/store"

	// echoSwagger "github.com/swaggo/echo-swagger"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		// default Port
		port = "8081"
	}

	r := router.New()
	r.GET("/swagger/*", echoSwagger.WrapHandler)
	mongoClient, err := db.GetMongoClient()
	if err != nil {
		log.Fatal(err)
	}
	usersDb := db.SetupUsersDb(mongoClient)
	tweetsDb := db.SetupTweetsDb(mongoClient)
	hashtagsDb := db.SetupHashtagsDb(mongoClient)
	g := r.Group("")
	us := store.NewUserStore(usersDb)
	ts := store.NewTweetStore(tweetsDb)
	hs := store.NewHashtagStore(hashtagsDb)
	h := handler.NewHandler(us, ts, hs)
	h.Register(g)

	// Fire up the trends beforehand
	err = hs.Update()
	if err != nil {
		log.Fatal(err)
	}

	// RUN THIS IF YOUR HASHTAG DATABASE IS EMPTY
	// StartUpTrends(ts, h)

	r.Logger.Fatal(r.Start("0.0.0.0:" + port))
}

func StartUpTrends(ts *store.TweetStore, h *handler.Handler) {
	allTweets, err := ts.GetAllTweets()
	if err != nil {
		log.Fatal(err)
	}
	for _, bm := range allTweets {
		var t *model.Tweet
		bsonBytes, _ := bson.Marshal(bm)
		_ = bson.Unmarshal(bsonBytes, &t)
		hashtags := ts.ExtractHashtags(t)
		for name, cnt := range hashtags {
			err = h.AddHashtag(name, t, cnt)
			if err != nil {
				log.Fatal(err)
			}
		}
	}
}
