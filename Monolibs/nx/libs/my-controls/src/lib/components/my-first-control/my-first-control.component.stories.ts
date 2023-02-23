import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { MyFirstControlComponent } from './my-first-control.component';

export default {
  title: 'MyFirstControlComponent',
  component: MyFirstControlComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<MyFirstControlComponent>;

const Template: Story<MyFirstControlComponent> = (args: MyFirstControlComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
