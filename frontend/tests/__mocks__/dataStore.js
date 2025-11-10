import { factory, seq } from '@factory-js/factory';
import { faker } from '@faker-js/faker';

export const PICTURE_SIZE = 50;
export const COMMENT_SIZE = 50;

export const userFactory = factory.define({
  props: {
    email: () => 'testuser@example.com',
    handle: () => faker.internet.username(),
    pk: seq(1, (n) => n),
  },
  vars: {},
});

export const shortUserFactory = factory.define({
  props: {
    handle: () => faker.internet.username(),
    pk: seq(1, (n) => n),
  },
  vars: {},
});

export const pictureFactory = factory.define({
  props: {
    pk: () => faker.string.uuid(),
    title: () => faker.lorem.sentence(15),
    picture: () => faker.image.url(),
    is_user: () => false,
    is_liked: () => false,
    total_likes: () => faker.number.int(),
    user: () =>
      shortUserFactory.props({ email: () => faker.internet.email() }).build(),
  },
  vars: {},
});


export const commentFactory = factory.define({
  props: {
    pk: () => faker.number.bigInt(),
    comment: () => faker.lorem.sentence(150),
    is_user: () => false,
    user: () =>
      shortUserFactory.props({ email: () => faker.internet.email() }).build(),
  },
  vars: {},
});


export const picture = await pictureFactory.build();
export const pictures = await pictureFactory.buildList(PICTURE_SIZE);
export const comments = await commentFactory.buildList(COMMENT_SIZE)