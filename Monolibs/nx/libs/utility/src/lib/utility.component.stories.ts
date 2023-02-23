import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UtilityComponent } from './utility.component';

export default {
  title: 'UtilityComponent',
  component: UtilityComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<UtilityComponent>;

const Template: Story<UtilityComponent> = (args: UtilityComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
