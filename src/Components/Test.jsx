import { app } from "../constants/firebase";

import {
  child,
  get,
  getDatabase,
  ref,
  // enableLogging,
  orderByChild,
  query,
  limitToLast,
  limitToFirst,
  startAt,
  endAt,
  endBefore,
  orderByKey,
} from "firebase/database";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const email = "user30@mail.com";
const password = "PASSWORD";

const DB_PSYCHOLOGISTS_PATH = "psychologists";
const LIMIT = 4;
const SORT_ORDER = {
  asc: "asc",
  desc: "desc",
};
const PRICE_TO_FILTER = 170;

const FILTER_OPTIONS = {
  nameAsc: {
    key: "name",
    queryConstraint: [orderByChild("name"), limitToFirst(LIMIT + 1)],
    value: "A to Z",
    sortOrder: SORT_ORDER.asc,
  },
  nameDesc: {
    key: "name",
    queryConstraint: [orderByChild("name"), limitToLast(LIMIT + 1)],
    value: "Z to A",
    sortOrder: SORT_ORDER.desc,
  },
  priceGreater: {
    key: "price_per_hour",
    queryConstraint: [orderByChild("price_per_hour"), limitToFirst(LIMIT + 1)],
    additionalQueryConstraint: [startAt(PRICE_TO_FILTER)],
    value: `Greater than ${PRICE_TO_FILTER}$`,
    sortOrder: SORT_ORDER.asc,
  },
  priceLess: {
    key: "price_per_hour",
    queryConstraint: [
      orderByChild("price_per_hour"),
      limitToFirst(LIMIT + 1),
      endBefore(PRICE_TO_FILTER),
    ],
    value: `Less than ${PRICE_TO_FILTER}$`,
    sortOrder: SORT_ORDER.asc,
  },
  popularAsc: {
    key: "rating",
    queryConstraint: [orderByChild("rating"), limitToFirst(LIMIT + 1)],
    value: "Not popular",
    sortOrder: SORT_ORDER.asc,
  },
  popularDesc: {
    key: "rating",
    queryConstraint: [orderByChild("rating"), limitToLast(LIMIT + 1)],
    value: "Popular",
    sortOrder: SORT_ORDER.desc,
  },
  showAll: {
    key: "showAll",
    queryConstraint: [orderByKey(), limitToFirst(LIMIT + 1)],
    value: "Show all",
    sortOrder: SORT_ORDER.asc,
  },
};

// enableLogging(true);
// const auth = getAuth(app);
const db = getDatabase(app);

export const Test = () => {
  const { user, signUp, signIn, signOutUser, getCurrent } = useAuth();
  // const [user, setUser] = useState(null);

  const [, setItems] = useState([]);

  const [nextKey, setNextKey] = useState(null);
  const [nextValue, setNextValue] = useState(null);
  const [shouldGetItems, setShouldGetItems] = useState(true);

  const [selectedFilter, setSelectedFilter] = useState({
    ...FILTER_OPTIONS.nameAsc,
    id: "nameAsc",
  });
  const [queryConstraint, setQueryConstraint] = useState([]);

  useEffect(() => {
    if (!nextKey) return;

    const constraintParams =
      selectedFilter.sortOrder === SORT_ORDER.asc
        ? [startAt(nextValue, nextKey)]
        : [endAt(nextValue, nextKey)];

    setQueryConstraint([
      ...selectedFilter.queryConstraint,
      ...constraintParams,
    ]);
  }, [nextKey, nextValue, selectedFilter]);

  useEffect(() => {
    const queryConstraint = selectedFilter.additionalQueryConstraint
      ? [
          ...selectedFilter.queryConstraint,
          ...selectedFilter.additionalQueryConstraint,
        ]
      : [...selectedFilter.queryConstraint];

    setQueryConstraint(queryConstraint);
    setShouldGetItems(true);
  }, [selectedFilter]);

  useEffect(() => {
    const fetchData = async () => {
      const tempItems = [];

      try {
        const currentRef = query(
          ref(db, DB_PSYCHOLOGISTS_PATH),
          ...queryConstraint
        );
        const snapShot = await get(currentRef);

        snapShot.forEach((item) => {
          tempItems.push({ key: item.key, ...item.val() });
        });

        if (selectedFilter.sortOrder === SORT_ORDER.desc) {
          tempItems.reverse();
        }

        if (tempItems.length > LIMIT) {
          setNextKey(tempItems[tempItems.length - 1].key);
          setNextValue(tempItems[tempItems.length - 1][selectedFilter.key]);
          tempItems.pop();
        } else {
          setNextKey(null);
          setNextValue(null);
        }

        setItems((prevItems) => [...prevItems, ...tempItems]);
        setShouldGetItems(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (shouldGetItems && queryConstraint.length > 0) {
      fetchData();
    }
  }, [queryConstraint, selectedFilter, shouldGetItems]);

  const handleSignUp = async () => {
    //   try {
    //     const userCredential = await createUserWithEmailAndPassword(
    //       auth,
    //       email,
    //       password
    //     );

    //      await updateProfile(auth.currentUser, {
    //       displayName: "Jane Q. User",
    //       photoURL: "https://example.com/jane-q-user/profile.jpg",
    //     });

    //     // console.log(userCredential.user.toJSON(), updateInfo);
    //     // setUser(userCredential.user);
    //   } catch (error) {
    //     console.log(error);
    //   }
    signUp({ email, password, name: "vasia" });
    // try {
    //   signUp({ email, password, name: "vasia" });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleSignIn = async () => {
    // try {
    //   const userCredential = await signInWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   console.log(userCredential.user);
    //   // console.log(auth);
    //   setUser(userCredential.user);
    // } catch (error) {
    //   console.log(error.code);
    // }
    signIn({ email, password });
  };

  const handleSignOut = async () => {
    // try {
    //   await signOut(auth);
    //   setUser(null);
    //   // console.log(auth);
    //   // setUser(userCredential.user);
    // } catch (error) {
    //   console.log(error.code);
    // }
    signOutUser();
  };

  const handleGetCurrent = async () => {
    getCurrent();
  };

  const handleGetData = async () => {
    try {
      const data = await get(child(ref(db), DB_PSYCHOLOGISTS_PATH));
      console.log(data.val());
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = () => {
    setShouldGetItems(true);
  };

  const handleSelect = (e) => {
    const id = e.target.value;
    setItems([]);
    setNextKey(null);
    setNextValue(null);
    setSelectedFilter({ ...FILTER_OPTIONS[id], id });
  };

  return (
    <div>
      <div>
        {!user ? <div>Unregistered</div> : <div>{user.email}</div>}
        <button onClick={handleSignUp}>SignUp</button>
        <button onClick={handleSignIn}>SignIn</button>
        <button onClick={handleSignOut}>SignOut</button>
        <button onClick={handleGetCurrent}>GetCurrent</button>
      </div>
      <div>
        DB
        <button onClick={handleGetData}>GetData</button>
        <button onClick={handleLoadMore} disabled={!nextKey}>
          Load More Data
        </button>
        <select value={selectedFilter.id} onChange={handleSelect}>
          {Object.entries(FILTER_OPTIONS).map(([id, data]) => (
            <option key={id} value={id}>
              {data.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// const url =
//   'https://learnlingo-260b6-default-rtdb.europe-west1.firebasedatabase.app/teachers.json?orderBy="price_per_hour"&limitToFirst=4&startAt=32&auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMDUxMThiZTBmNTZkYzA4NGE0NmExN2RiNzU1NjVkNzY4YmE2ZmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGVhcm5saW5nby0yNjBiNiIsImF1ZCI6ImxlYXJubGluZ28tMjYwYjYiLCJhdXRoX3RpbWUiOjE3MTczNjQzMjIsInVzZXJfaWQiOiJoMGIwV2VmbUJnZ3RrRjNMSkN4NDZaTkxVSnoxIiwic3ViIjoiaDBiMFdlZm1CZ2d0a0YzTEpDeDQ2Wk5MVUp6MSIsImlhdCI6MTcxNzg4MDI1NiwiZXhwIjoxNzE3ODgzODU2LCJlbWFpbCI6InVzZXIzQGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInVzZXIzQGV4YW1wbGUuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Y9BXVjE6k-TOWZj14mI56QLjhAwxO-YDXY3tsjb2JpRLfOQoSjAH_O6cBimr56Fj5ZDfBvEetwXDhWnLPwgvJksIGriNrNkm9qUvfjoRwIZ6n-oZjC5WeLT9UkGGG9G8drqBQoBfMq68jdzRRdDmp9r9N9_Dvgh0Gj0GE8RDNk7nYk_Go9EB5Lp-3SA2bJHdvom4BXwl60Lp9ZNoRtyg3d7JjWZdq8wP0RQLtKMw05co66irCvLn1DLDasFJuXh-xQyAvUonp4piRFR7a18SUe4e3EPM6ZVuZ_GBJhRX5GLkwN7NBY9iJmnJKWPHQqfRyK07W1dW1PMgVnELnX2xQg';

// const response = await fetch(url);
// const fetchedData = await response.json();
// console.log("fetchedData", fetchedData);
