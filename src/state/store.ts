import { create } from 'zustand';

type State = {
  conversationId: string | null;
  senderId: string | null;
  receiverId: string | null; // Fixed typo
};

type Action = {
  updateConversationId: (conversationId: State['conversationId']) => void;
  updateSenderId: (senderId: State['senderId']) => void;
  updateReceiverId: (receiverId: State['receiverId']) => void; // Fixed typo
};

// Create your store, which includes both state and actions
const useConversationStore = create<State & Action>((set) => ({
  conversationId: null,
  senderId: "94f86888-2dff-454d-bd8e-4013106a5531",
  receiverId: "1d10c190-8c45-448f-9de3-02e19e816ec2", // Fixed typo
  updateConversationId: (conversationId) => set({ conversationId }),
  updateSenderId: (senderId) => set({ senderId }),
  updateReceiverId: (receiverId) => set({ receiverId }), // Fixed typo
}));

export default useConversationStore;
