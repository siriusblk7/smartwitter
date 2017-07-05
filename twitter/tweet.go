package twitter

import (
	"fmt"
	"time"

	"github.com/remeh/uuid"
)

var (
	tweetIdSpace = uuid.UUID("139866bf-4932-4039-91f1-c8c4a5994837")
)

type Tweets []Tweet

type Tweet struct {
	// Please use Uid() to gets the UUID of this tweet.
	uid uuid.UUID
	// Time of the entry in the database.
	CreationTime time.Time
	// Id of the tweet on Twitter.
	TwitterId int64
	// Twitter profile creation time.
	TwitterCreationTime time.Time
	Text                string
	UserUid             uuid.UUID
}

func (t Tweet) Uid() uuid.UUID {
	return uuid.NewSHA1(tweetIdSpace, []byte(fmt.Sprintf("%d", t.TwitterId)))
}
