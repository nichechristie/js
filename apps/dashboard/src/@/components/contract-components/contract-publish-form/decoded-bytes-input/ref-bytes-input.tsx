import type { AbiParameter } from "abitype";
import { TrashIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { ThirdwebClient } from "thirdweb";
import { FormFieldSetup } from "@/components/blocks/FormFieldSetup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkeletonContainer } from "@/components/ui/skeleton";
import {
  useAllVersions,
  usePublishedContractsQuery,
} from "@/hooks/contract-hooks";
import { cn } from "@/lib/utils";

interface RefBytesContractInputProps {
  param: AbiParameter;
  index: number;
  paramIndex: number;
  setIndex: number;
  remove: (index: number) => void;
  className?: string;
  client: ThirdwebClient;
}

export const RefBytesContractInput: React.FC<RefBytesContractInputProps> = ({
  param,
  index,
  paramIndex,
  setIndex,
  remove,
  className,
  client,
}) => {
  const form = useFormContext();

  const publishedContractsQuery = usePublishedContractsQuery({
    address: form.watch(
      `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.publisherAddress`,
    ),
    client,
  });

  const allVersions = useAllVersions(
    form.watch(
      `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.publisherAddress`,
    ),
    form.watch(
      `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.contractId`,
    ),
    client,
  );

  return (
    <div className={cn("flex flex-col items-end gap-4 lg:flex-row", className)}>
      <div className="grid grow grid-cols-1 gap-4 lg:grid-cols-4">
        <FormFieldSetup
          errorMessage={
            form.getFieldState(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.publisherAddress`,
              form.formState,
            ).error?.message
          }
          isRequired={true}
          label="Publisher"
        >
          <Input
            className="truncate"
            placeholder="Address or ENS"
            {...form.register(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.publisherAddress`,
            )}
          />
        </FormFieldSetup>

        <FormFieldSetup
          errorMessage={
            form.getFieldState(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.refContracts.${index}.contractId`,
              form.formState,
            ).error?.message
          }
          isRequired={true}
          label="Contract Name"
        >
          <SkeletonContainer
            className="block"
            loadedData={!publishedContractsQuery.isFetching ? true : undefined}
            render={() => {
              return (
                <Select
                  disabled={(publishedContractsQuery?.data || []).length === 0}
                  {...form.register(
                    `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.contractId`,
                  )}
                  onValueChange={(v) => {
                    form.setValue(
                      `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.contractId`,
                      v,
                    );
                  }}
                >
                  <SelectTrigger className="min-w-[180px]">
                    <SelectValue
                      placeholder={
                        publishedContractsQuery.isFetched &&
                        (publishedContractsQuery?.data || []).length === 0
                          ? "No contracts found"
                          : "Select contract"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {publishedContractsQuery?.data?.map(({ contractId }) => (
                      <SelectItem key={contractId} value={contractId}>
                        {contractId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
            skeletonData={false}
          />
        </FormFieldSetup>

        <FormFieldSetup
          errorMessage={
            form.getFieldState(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.refContracts.${index}.version`,
              form.formState,
            ).error?.message
          }
          isRequired={false}
          label="Contract Version"
        >
          <SkeletonContainer
            className="block"
            loadedData={!allVersions.isFetching ? true : undefined}
            render={() => {
              return (
                <Select
                  disabled={!allVersions.data}
                  {...form.register(
                    `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.version`,
                  )}
                  onValueChange={(v) => {
                    form.setValue(
                      `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.version`,
                      v === "latest" ? "" : v,
                    );
                  }}
                >
                  <SelectTrigger className="min-w-[180px]">
                    <SelectValue placeholder="Latest Version" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="latest">Latest Version</SelectItem>
                    {allVersions?.data?.map(({ version }) => {
                      if (!version) return null;
                      return (
                        <SelectItem key={version} value={version}>
                          {version}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            }}
            skeletonData={false}
          />
        </FormFieldSetup>

        <FormFieldSetup
          errorMessage={
            form.getFieldState(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.salt`,
              form.formState,
            ).error?.message
          }
          isRequired={false}
          label="Salt"
        >
          <Input
            className="truncate"
            placeholder="Salt (optional)"
            {...form.register(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.paramsToEncode.${setIndex}.${paramIndex}.dynamicValue.refContracts.${index}.salt`,
            )}
          />
        </FormFieldSetup>
      </div>

      <Button
        aria-label="Remove"
        className="self-end text-destructive-text"
        onClick={() => remove(index)}
        variant="outline"
      >
        <TrashIcon className="size-4" />
      </Button>
    </div>
  );
};
