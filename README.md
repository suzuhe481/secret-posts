# Secret Posts

This is a simple social media site where users can make posts anonymously depending on their membership when they register.

- Public: Can view posts without names.
- Member: Can make posts, delete their posts/profile. And the above.
- Member+: Can view post authors. And the above.
- Admin: Can delete any post/profile. And the above.

This website is built with Node.js and Express. User information is stored in a MongoDB database.
[Try the live demo here.](https://secret-posts.glitch.me/)

## Description

You can create an account by filling out the form with your name, username, and email.
Your username is what will be displayed and you sign in with your email.

**You will not be sent any emails and you don't need to provide any real information. Emails also do not have to be real. They just need to be in an email format. (email@mail.com)**

The posts are styled as sticky notes. Each sticky note has the author's name, date it was posted, and their post. You can click a post's author to go to their profile and see all their posts.
If you've read this far and want to sign up as a Member+, the Member+ Password is "secret".

In order to sign up as an Admin, you need a different password which won't be shared.

## Releases

### Release 1

- Sticky note styles posts.
- Responsive web design for mobile and desktop.
- Sign up forms for members and admins.
- Admin privileges include ability to delete any post or profile.
