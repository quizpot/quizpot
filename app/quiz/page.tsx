"use client"
import { MessageList } from "@/components/message_list";
import { MessageSubmit } from "@/components/message_submit";
import { useMessaging } from "@/components/messaging";

export default function Page() {
  const [messages, sendMessage] = useMessaging(
    () => `ws://${window.location.host}/api/ws`,
  );

  return (
    <div style={{ maxWidth: '50vh' }}>
      <MessageList messages={messages} />
      <MessageSubmit onMessage={sendMessage} />
    </div>
  );
}