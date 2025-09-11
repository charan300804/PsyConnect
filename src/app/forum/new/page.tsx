
import NewPostForm from '@/components/forum/new-post-form';

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Create a New Post</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Share your thoughts, ask a question, or start a discussion.
        </p>
      </div>
      <NewPostForm />
    </div>
  );
}
