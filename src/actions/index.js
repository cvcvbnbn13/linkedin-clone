import db, { auth, provider, storage } from '../firebase';
import {
  SET_USER,
  CLEAN_USER,
  SET_LOADING_STATUS,
  GET_ARTICLE,
  DELETE_ARTICLE,
} from '../actions/actionType';

export const signInAPI = () => {
  return async dispatch => {
    try {
      const { user } = await auth.signInWithPopup(provider);
      dispatch({ type: SET_USER, payload: user });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const setLoading = status => {
  return dispatch => {
    dispatch({ type: SET_LOADING_STATUS, payload: status });
  };
};

export const getUserAuth = () => {
  return dispatch => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        dispatch({
          type: SET_USER,
          payload: user,
        });
      }
    });
  };
};

export const signOutAPI = () => {
  return async dispatch => {
    try {
      await auth.signOut();
      dispatch({
        type: CLEAN_USER,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const postArticle = payload => {
  return dispatch => {
    dispatch(setLoading(true));

    if (payload.image !== '') {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        'state_change',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress: ${progress}%`);
          if (snapshot.state === 'RUNNING') {
            console.log(`Progress: ${progress}%`);
          }
        },
        error => {
          console.log(error.code);
        },
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          return db
            .collection('articles')
            .add({
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              shareImage: downloadURL,
              comments: 0,
              description: payload.description,
              id: '',
            })
            .then(doc => {
              doc.update({ id: doc.id });
              dispatch(setLoading(false));
            });
        }
      );
    } else if (payload.video) {
      db.collection('articles')
        .add({
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          shareImage: '',
          comments: 0,
          description: payload.description,
          id: '',
        })
        .then(doc => {
          doc.update({ id: doc.id });
          dispatch(setLoading(false));
        });
    } else if (!payload.video && !payload.image) {
      db.collection('articles')
        .add({
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: '',
          shareImage: '',
          comments: 0,
          description: payload.description,
          id: '',
        })
        .then(doc => {
          doc.update({ id: doc.id });
          dispatch(setLoading(false));
        });
    }
  };
};

export const getArticle = () => {
  return async dispatch => {
    let payload;
    dispatch(setLoading(true));
    await db
      .collection('articles')
      .orderBy('actor.date', 'desc')
      .onSnapshot(snapshot => {
        payload = snapshot.docs.map(doc => doc.data());
        dispatch({ type: GET_ARTICLE, payload: payload });
      });
    dispatch(setLoading(false));
  };
};

export const deleteArticle = id => {
  return async dispatch => {
    dispatch(setLoading(true));
    await db.collection('articles').doc(id).delete();
    dispatch({ type: DELETE_ARTICLE });
    dispatch(getArticle());
    dispatch(setLoading(false));
  };
};

// export const editArticle = (id, newArticle) => {
//   return async dispatch => {
//     dispatch(setLoading(true));
//     if (newArticle.image !== '') {
//       const upload = storage
//         .ref(`images/${newArticle.image.name}`)
//         .put(newArticle.image);
//       upload.on(
//         'state_change',
//         snapshot => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Progress: ${progress}%`);
//           if (snapshot.state === 'RUNNING') {
//             console.log(`Progress: ${progress}%`);
//           }
//         },
//         error => {
//           console.log(error.code);
//         },
//         async () => {
//           const downloadURL = await upload.snapshot.ref.getDownloadURL();
//           return db.collection('articles').update({
//             actor: {
//               description: newArticle.user.email,
//               title: newArticle.user.displayName,
//               date: newArticle.timestamp,
//               image: newArticle.user.photoURL,
//             },
//             video: newArticle.video,
//             shareImage: downloadURL,
//             description: newArticle.description,
//           });
//         }
//       );
//       dispatch(setLoading(false));
//     } else if (newArticle.video) {
//       db.collection('articles').update({
//         actor: {
//           description: newArticle.user.email,
//           title: newArticle.user.displayName,
//           date: newArticle.timestamp,
//           image: newArticle.user.photoURL,
//         },
//         video: newArticle.video,
//         shareImage: '',
//         description: newArticle.description,
//       });
//       dispatch(setLoading(false));
//     }
//   };
// };
