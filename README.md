# Rebookmark

## Features

1. Post Links with a Tag / Tags
1. After Initial Post, view links, remove, add links
    1. Add tags, remove tags
    1. View Links by tag
    1. Tag Cloud
1. Link with edit access, Link with read-only access
1. Display links by tags
1. Link to a specific tag edit/read-only access

## Technologies

- FireStore

## Database

JSON Structure

```js
{
    "random-uuid": {
        readOnlyAccessToken: "abaasdfa",
        bookmarks: [
            {
                folder: "math/algebra",
                link: "urlA",
                tags: ["A", "b"]
            },
            {
                folder: "algebra",
                title: "",
                description: "",
                link: "urlB",
                tags: ["a", "b", "c"]
            },
            {
                link: "urlC",
                tags: ["a", "b", "c"]
            }
        ]
    }
}

```

```js
// URL POST
// api.rebookmark.com/post

// FireStore. Function create link card

{ 
    "tags": [""],
    "links": ["", ""]
}

```


collectionGroup
where

indexes
  .withConverter(cityConverter)




