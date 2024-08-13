import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Global store to keep track of who is connected to our app and subscribed
 * to this presence channel
 */

type PresenceState = {
  // Track the ids of users that are connected to our app
  members: string[];
  // Action to add a user to the members
  add: (id: string) => void;
  // Action to remove the user from the members
  remove: (id: string) => void;
  // Set members to the ides
  set: (ids: string[]) => void;
};

const usePresenceStore = create<PresenceState>()(
  devtools(
    (set) => ({
      members: [],
      add: (id) => set((state) => ({ members: [...state.members, id] })),
      remove: (id) =>
        // This filter out users that does not match the provided id
        set((state) => ({ members: state.members.filter((member) => member !== id) })),
      // This will be used when a user first subscribe to the presence channel
      set: (ids) => set({ members: ids }),
    }),
    { name: "PresenceStore" }
  )
);

export default usePresenceStore;
