import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { Ecosystem } from "@/api/ecosystems";

export function useUpdateEcosystem(
  params: {
    authToken: string;
    teamId: string;
  },
  options?: Omit<UseMutationOptions<boolean, unknown, Ecosystem>, "mutationFn">,
) {
  const { authToken, teamId } = params;
  const { onSuccess, ...queryOptions } = options || {};
  const queryClient = useQueryClient();

  return useMutation({
    // Returns true if the update was successful
    mutationFn: async (params: Ecosystem): Promise<boolean> => {
      const res = await fetch(`${params.url}/${params.id}`, {
        body: JSON.stringify(params),
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "x-thirdweb-team-id": teamId,
        },
        method: "PATCH",
      });

      if (!res.ok) {
        const body = await res.json();
        console.error(body);
        if (res.status === 401) {
          throw new Error("You're not authorized to update this ecosystem");
        }
        if (res.status === 406) {
          throw new Error(
            "Please setup billing on your account to continue managing this ecosystem",
          );
        }
        throw new Error(
          body?.message ?? body?.error?.message ?? "Failed to update ecosystem",
        );
      }

      return true;
    },
    onSuccess: async (partner, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["ecosystems"],
      });
      if (onSuccess) {
        return onSuccess(partner, variables, context);
      }
      return;
    },
    ...queryOptions,
  });
}
