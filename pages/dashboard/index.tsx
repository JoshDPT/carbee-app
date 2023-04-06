import { signIn, getCsrfToken } from 'next-auth/react';

export default function Dashboard() {
  return (
    <div>
      Test 2
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context: any) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
