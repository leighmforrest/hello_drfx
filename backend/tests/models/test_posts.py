class TestPosts:
    def test_post_model(self, test_post, test_user):
        assert test_post.author.username == test_user.username
        assert len(test_post.title) > 0
        assert len(test_post.body) > 0

    def test_post___str__(self, test_post):
        assert str(test_post) == test_post.title
