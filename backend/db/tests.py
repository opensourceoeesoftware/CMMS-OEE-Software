from django.test import TestCase

# Create your tests here.
class EmptyTest(TestCase):

    '''Mockup test'''
    def setUp(self):
        pass

    def test_empty_test(self):
        """Mockup test"""
       
        self.assertEqual(True, True)