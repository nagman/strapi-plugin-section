import { Box, Divider, Flex, Typography } from "@strapi/design-system";
import React from "react";

type Sizes = "big" | "medium" | "small";

const sizes: Record<
  Sizes,
  {
    divider: { text: string; variant: string };
    title: { variant: string; prefix: string };
    padding: number;
  }
> = {
  big: {
    divider: {
      text: "• \u00A0 • \u00A0 •",
      variant: "beta",
    },
    title: {
      variant: "alpha",
      prefix: "#",
    },
    padding: 10,
  },

  medium: {
    divider: {
      text: "• • •",
      variant: "epsilon",
    },
    title: {
      variant: "beta",
      prefix: "##",
    },
    padding: 6,
  },

  small: {
    divider: {
      text: "\u00A0",
      variant: "pi",
    },
    title: {
      variant: "delta",
      prefix: "###",
    },
    padding: 4,
  },
};

type Props = {
  name: string;
  intlLabel: { defaultMessage: string };
  attribute: { options: { size: Sizes; divider: boolean } };
};

export default function Index({ name, intlLabel, attribute }: Props) {
  const { size, divider: hasDivider } = attribute.options;

  const { divider, title, padding } = sizes[size];

  return (
    <Box>
      {hasDivider && (
        <Flex direction="column" alignItems="center">
          <Box paddingTop={padding} paddingBottom={padding}>
            <Typography textColor="neutral300" variant={divider.variant}>
              {divider.text}
            </Typography>
          </Box>
        </Flex>
      )}
      <Typography textColor="neutral300" variant={title.variant}>
        {title.prefix}
      </Typography>{" "}
      <Typography variant={title.variant}>
        {intlLabel.defaultMessage || name}
      </Typography>
      <Box paddingTop={padding / 2} paddingBottom={padding / 2}>
        <Divider />
      </Box>
    </Box>
  );
}
