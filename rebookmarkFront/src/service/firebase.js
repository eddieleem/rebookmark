import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
import "firebase/firestore";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyCiZB0bk7XPUKjqoATWgEn1rCJe_a_rPEc",
  authDomain: "rebookmark-17d1c.firebaseapp.com",
  projectId: "rebookmark-17d1c",
  storageBucket: "rebookmark-17d1c.appspot.com",
  messagingSenderId: "270073243053",
  appId: "1:270073243053:web:d895ebda824e12be1ead24",
  measurementId: "G-H14N3YT33J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export class Link {
  constructor (url, tags, createdBy, createdAt, publicCode, id) {
      this.url = url;
      this.tags = tags;
      this.createdBy = createdBy;
      this.createdAt = createdAt;
      this.publicCode = publicCode;
      this.id = id || undefined;
  }
  toString() {
      return this.url + "." + this.id;
  }
}

class User {
  constructor (publicCode) {
      this.publicCode = publicCode;
  }
}

// FireStore data converter
const linkConverter = {
  toFirestore: function(link) {
      return {
          url: link.url,
          tags: link.tags,
          publicCode: link.publicCode,
          createdBy: link.createdBy,
          createdAt: link.createdAt,
      };
  },
  fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      return new Link(data.url, data.tags, data.createdBy, data.createdAt, data.publicCode, snapshot.id);
  }
};

const userConverter = {
  toFirestore: function(user) {
      return {
          publicCode: user.publicCode
      };
  },
  fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      return new User(data.publicCode);
  }
}

export function testRun() {
  // const userRef = createNewUser("publicCode111");
  const userId = "8zjmxE4lNt14ZtDWjyRJ";
  const publicCode = "publicCode1";

  // userRef.then((doc) => {
    // console.log("newUser", doc.id);
    // const userId = doc.id;

    // addLink(userId, "https://google.com", ["hello", "world", "something"]);
    // addLink(userId, "https://facebook.com", ["kpop", "world", "something"]);

    // upsertLink(userId,
    //   "https://google.com/" + (new Date()).getSeconds().toString(),
    //   ["music", "vpop"],
    //   publicCode, "lOldlLGmWw76FNfRt1kb");

    upsertLink(userId,
      "https://google.com/" + (new Date()).getSeconds().toString(),
      ["music", "jpop"],
      publicCode);

    getAllTagsByUserId(userId).then((data) => {
      console.log("allTags", data)
    });

    getRecentLinks(5).then(querySnapshot => {
      querySnapshot.forEach(link => {
        console.log("RECENT LINK", link.data());
      });
    });

    // removeLink("LJmqRNvk6e2LPChEiGGp").then(() => {
    //   const links = getLinksByUserId(userId);
    //   return links.then((querySnapshot) => {
    //     querySnapshot.forEach(link => {
    //       console.log("link", link.data().url, link.data().tags, link.id);
    //     })
    //   });
    // });

    // const linksByTag = getLinksByTag("hello");
    // linksByTag.get().then((querySnapshot) => {
    //   querySnapshot.forEach(link => {
    //     console.log("link", link.data().url, link.data().tags);
    //   })
    // });
  // });

}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_$-+';

export function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function createNewUser(publicCode) {
  console.log("fn: createNewUser", "publicCode", publicCode);
  return db.collection("users")
    .add({ publicCode })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export function createNewComment() {
  const userID = 'ThisIsUserID'
  const parentID = [
    {
      1, new Date('2020-11-11')
    }
  ]
  return db.collection("comment")
    .add({ userID, parentID })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export function getUser(userId) {
  return db.collection("users")
    .doc(userId)
    .get()
    .catch((error) => {
      console.error("Error getting document: ", error);
    });

}

export function upsertLink(userId, url, tags, publicCode, id) {
  console.log("upsertLink", userId, url, tags, publicCode, id);

  return db.collection("bookmarks")
    .withConverter(linkConverter)
    .doc(id || undefined)
    .set(new Link(url, tags, userId, new Date(), publicCode, id))
    .then(result => {
      if (typeof id === "undefined") {
        // result.
      }
      console.log("add", result);
    })
    .catch((error) => {
      console.error("Error upsert link: ", error);
    });
}

export function getLinksByUserId(userId) {
  return db.collection("bookmarks")
    .withConverter(linkConverter)
    .where("createdBy", "==", userId)
    .get();
}

export function getLinksByPublicCode(code) {
  return db.collection("bookmarks")
    .withConverter(linkConverter)
    .where("publicCode", "==", code)
    .get();
}

export function getLinksByTag(tag) {
  return db.collection("bookmarks")
    .withConverter(linkConverter)
    .where("tags", "array-contains", tag.toLowerCase())
    .get();
}

export function removeLink(linkId) {
  return db.collection("bookmarks")
    .doc(linkId)
    .delete()
    .then(result => {
      console.log("result", result);
    });
}

export async function getAllTagsByUserId(userId) {
  const allTags = [];
  const querySnapshot = await getLinksByUserId(userId);
  querySnapshot.forEach(doc => {
    const linkTags = doc.data().tags;
    linkTags.forEach(tag => {
      if (allTags.includes(tag)) return;
      allTags.push(tag);
    });
  });
  return allTags;
}

export function getRecentLinks(limit) {
  return db.collection("bookmarks")
    .withConverter(linkConverter)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get()
}