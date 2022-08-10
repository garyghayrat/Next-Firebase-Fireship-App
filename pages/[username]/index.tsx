
import { getUserWithUsername, postToJSON, firestore } from '../../lib/firebase';
import { query, collection, where, getDocs, limit, orderBy, getFirestore } from 'firebase/firestore';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';

export async function getServerSideProps({ query: urlQuery }) {
  const { username } = urlQuery;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

 // If no user, short circuit to 404 page
 if (!userDoc) {
  return {
    notFound: true,
  };
}
  if (userDoc) {
    user = userDoc.data();

    const postsQuery = query(
      collection(getFirestore(), userDoc.ref.path, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  )
}
