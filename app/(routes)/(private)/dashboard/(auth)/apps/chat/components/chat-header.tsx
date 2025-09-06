"use client";

import React from "react";
import { ArrowLeft, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAvatarFallback } from "@/lib/common/utils";
import useChatStore from "@/app/(routes)/dashboard/(auth)/apps/chat/useChatStore";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  CallDialog,
  ChatUserDropdown,
  VideoCallDialog
} from "@/app/(routes)/dashboard/(auth)/apps/chat/components";
import { Avatar, AvatarFallback, AvatarImage, AvatarIndicator } from "@/components/ui/avatar";
import { UserPropsTypes } from "@/app/(routes)/dashboard/(auth)/apps/chat/types";

export function ChatHeader({ user }: { user: UserPropsTypes }) {
  const { setSelectedChat } = useChatStore();

  return (
    <div className="flex justify-between gap-4 lg:px-4">
      <div className="flex gap-4">
        <Button
          size="sm"
          variant="outline"
          className="flex size-10 p-0 lg:hidden"
          onClick={() => setSelectedChat(null)}>
          <ArrowLeft />
        </Button>
        <Avatar className="overflow-visible lg:size-10">
          <AvatarImage src={`${user?.avatar}`} alt="avatar image" />
          <AvatarIndicator variant={user?.online_status} />
          <AvatarFallback>{generateAvatarFallback(user?.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{user.name}</span>
          {user.online_status == "success" ? (
            <span className="text-xs text-green-500">Online</span>
          ) : (
            <span className="text-muted-foreground text-xs">{user.last_seen}</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="hidden lg:flex lg:gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <VideoCallDialog />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Start Video Chat</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CallDialog />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Start Call</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ChatUserDropdown>
          <Button size="icon" variant="ghost">
            <Ellipsis />
          </Button>
        </ChatUserDropdown>
      </div>
    </div>
  );
}
