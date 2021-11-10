/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: 'identify',
      profile: profile => {
        if (profile.avatar === null) {
          const defaultAvatarNumber = Number(profile.discriminator as string) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = (profile.avatar as string).startsWith('a_') ? 'gif' : 'png';
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        return {
          id: profile.id as string,
          name: profile.username as string,
          image: profile.image_url as string,
          email: profile.email as string,
        };
      },
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async signIn(data) {
      const isAllowedToSignIn = data.id === process.env.LUXANNA_ID;
      if (isAllowedToSignIn) return true;

      return false;
    },
  },
  theme: 'dark',
});
