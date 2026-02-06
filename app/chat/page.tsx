import ChatInterface from '@/components/ai/ChatInterface';

export default function ChatPage() {
  return (
    <div className="container mx-auto p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6">AI Travel Assistant</h1>
      <div className="h-[calc(100vh-150px)] bg-white rounded-lg shadow-lg">
        <ChatInterface />
      </div>
    </div>
  );
}
