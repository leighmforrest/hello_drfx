import { factory, seq } from "@factory-js/factory";
import { faker } from "@faker-js/faker";

export const PICTURE_SIZE = 50
 
export const userFactory = factory.define({
  props: {
    email: () => "testuser@example.com",
    pk: seq(1, (n) => n),
  },
  vars: {}
});

export const pictureFactory = factory.define({
    props: {
        pk: () => faker.string.uuid(),
        title: () => faker.lorem.sentence(15),
        picture: () => faker.image.url(),
        user: () => userFactory.build()
    },
    vars: {}
})

export const pictures = await pictureFactory.buildList(PICTURE_SIZE)