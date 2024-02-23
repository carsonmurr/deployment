from django.test import TestCase
from .models import Discussion, Message
from .serializers import DiscussionSerializer, MessageSerializer
from accounts_app.models import CustomUser

class TestDiscussions(TestCase):
    def setUp(self):
        self.testUser = CustomUser.objects.create_user(
            username='testuser',
            password='testpassword',
            email='test@example.com',
            employee_id='12345'
        )
        self.testDiscussionData = {'title': 'Title'}
        self.testMessageData = {'discussion': self.testDiscussionData['title'], 'sender': self.testUser.id, 'content': 'Content'}


    def test_discussion_model(self):
        discussion = Discussion.objects.create(title='Title')
        self.assertEqual(discussion.title, 'Title')

    def test_message_model(self):
        discussion = Discussion.objects.create(title='Title')
        message = Message.objects.create(
            content='Content',
            discussion=discussion,
            sender=self.testUser
        )
        self.assertEqual(message.content, 'Content')

    def test_discussion_serializer(self):
        data = {'title': 'Title', 'users': [self.testUser.id]}
        serializer = DiscussionSerializer(data=data)
        if not serializer.is_valid():
            print(serializer.errors)
        self.assertTrue(serializer.is_valid())

        serializer = DiscussionSerializer(data={})
        self.assertFalse(serializer.is_valid())

    def test_message_serializer(self):
        discussion = Discussion.objects.create(title='Title')

        data = {'discussion': discussion.id, 'sender': self.testUser.id, 'content': 'Content'}
        serializer = MessageSerializer(data=data)
        if not serializer.is_valid():
            print(serializer.errors)
        self.assertTrue(serializer.is_valid())

        serializer = MessageSerializer(data={})
        self.assertFalse(serializer.is_valid())
