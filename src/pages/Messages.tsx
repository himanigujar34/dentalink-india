import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  BadgeCheck,
} from "lucide-react";

const mockConversations = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    avatar: null,
    lastMessage: "Thank you for the consultation details!",
    time: "2m ago",
    unread: 2,
    isVerified: true,
    specialty: "Endodontist",
  },
  {
    id: 2,
    name: "Smile Care Dental",
    avatar: null,
    lastMessage: "We would like to discuss the locum position...",
    time: "1h ago",
    unread: 0,
    isVerified: true,
    specialty: "Clinic",
  },
  {
    id: 3,
    name: "Dr. Rajesh Kumar",
    avatar: null,
    lastMessage: "Great case presentation!",
    time: "3h ago",
    unread: 0,
    isVerified: true,
    specialty: "Orthodontist",
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: "other",
    text: "Hello! I saw your portfolio and I'm impressed with your root canal work.",
    time: "10:30 AM",
  },
  {
    id: 2,
    senderId: "me",
    text: "Thank you! I've been focusing on complex cases lately.",
    time: "10:32 AM",
  },
  {
    id: 3,
    senderId: "other",
    text: "We have an opening for a consultant endodontist at our clinic in Bandra. Would you be interested?",
    time: "10:33 AM",
  },
  {
    id: 4,
    senderId: "me",
    text: "That sounds interesting! What days are you looking for?",
    time: "10:35 AM",
  },
  {
    id: 5,
    senderId: "other",
    text: "We need someone for Tuesdays and Thursdays. We have a full setup including RVG and rotary endo. The split is 40%.",
    time: "10:36 AM",
  },
  {
    id: 6,
    senderId: "other",
    text: "Thank you for the consultation details!",
    time: "10:38 AM",
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[0]
  );
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container py-6">
        <div className="card-clinical h-[calc(100vh-12rem)] flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-full md:w-80 border-r border-border flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-secondary border-0"
                />
              </div>
            </div>

            {/* Conversation List */}
            <ScrollArea className="flex-1">
              {mockConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-secondary/50 transition-colors text-left ${
                    selectedConversation.id === conv.id ? "bg-secondary" : ""
                  }`}
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-semibold shrink-0">
                    {conv.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground truncate">
                        {conv.name}
                      </span>
                      {conv.isVerified && (
                        <BadgeCheck className="h-4 w-4 text-primary fill-primary/20 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {conv.specialty}
                    </p>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {conv.time}
                    </span>
                    {conv.unread > 0 && (
                      <span className="mt-1 block h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center ml-auto">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-semibold">
                  {selectedConversation.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground">
                      {selectedConversation.name}
                    </span>
                    {selectedConversation.isVerified && (
                      <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.specialty} • Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                        msg.senderId === "me"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span
                        className={`text-[10px] mt-1 block ${
                          msg.senderId === "me"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary border-0"
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button size="icon" className="bg-primary hover:bg-primary/90">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile: Select conversation message */}
          <div className="flex md:hidden flex-1 items-center justify-center p-8 text-center">
            <div>
              <p className="text-muted-foreground">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
