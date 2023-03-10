import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginId from "./pluginId";

export default {
	register(app: any) {
		app.customFields.register({
			name: "title",
			type: "string",
			pluginId: "section",
			intlLabel: {
				id: "section.label",
				defaultMessage: "Section",
			},
			intlDescription: {
				id: "section.description",
				defaultMessage: "A section to organize fields",
			},
			components: {
				Input: async () =>
					import(
						/* webpackChunkName: "input-component" */ "./components/Input"
					),
			},
			options: {
				base: [
					{
						intlLabel: {
							id: "section.size",
							defaultMessage: "Size",
						},
						description: {
							id: "section.size.description",
							defaultMessage: "Choose size of section",
						},
						name: "options.size",
						type: "select",
						defaultValue: "Big",
						options: [
							{
								key: "big",
								value: "big",
								metadatas: {
									intlLabel: {
										id: "section.size.big",
										defaultMessage: "Big",
									},
								},
							},
							{
								key: "medium",
								value: "medium",
								metadatas: {
									intlLabel: {
										id: "section.size.medium",
										defaultMessage: "Medium",
									},
								},
							},
							{
								key: "small",
								value: "small",
								metadatas: {
									intlLabel: {
										id: "section.size.small",
										defaultMessage: "Small",
									},
								},
							},
						],
					},
					{
						intlLabel: {
							id: "section.divider",
							defaultMessage: "Divider",
						},
						description: {
							id: "section.divider.description",
							defaultMessage: "Display a divider before",
						},
						name: "options.divider",
						type: "checkbox",
						defaultValue: false,
					},
				],
			},
		});
	},

	bootstrap(app: any) {},

	async registerTrads(app: any) {
		const { locales } = app;

		const importedTrads = await Promise.all(
			(locales as any[]).map((locale) => {
				return import(`./translations/${locale}.json`)
					.then(({ default: data }) => {
						return {
							data: prefixPluginTranslations(data, pluginId),
							locale,
						};
					})
					.catch(() => {
						return {
							data: {},
							locale,
						};
					});
			})
		);

		return Promise.resolve(importedTrads);
	},
};
