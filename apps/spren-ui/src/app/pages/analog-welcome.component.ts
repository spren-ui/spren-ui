import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@spren-ui/components/accordion';
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '@spren-ui/components/checkbox';

@Component({
  selector: 'spren-ui-analog-welcome',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    DatePipe,
    NgIf,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Checkbox,
    CheckboxControl,
    CheckboxInput,
    CheckboxLabel,
  ],
  host: {
    class: 'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32',
  },
  template: `
    <main class="mx-auto flex-1">
      <section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div class="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <svg
            id="svg27"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg"
            width="362.26562"
            zoomAndPan="magnify"
            viewBox="0 0 271.62214 192.65233"
            height="256.86978"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            class="mx-auto -mb-4 h-16 w-16"
          >
            <defs id="defs11">
              <clipPath id="id1">
                <path
                  id="path2"
                  d="M 127.29688,75.375 H 347.57031 V 267.52734 H 127.29688 Z m 0,0"
                  clip-rule="nonzero"
                />
              </clipPath>
              <clipPath id="id2">
                <path id="path5" d="M 75.871094,104 H 263.33594 V 268.03125 H 75.871094 Z m 0,0" clip-rule="nonzero" />
              </clipPath>
              <clipPath id="id3">
                <path id="path8" d="m 105,169.02344 h 210 v 87.875 H 105 Z m 0,0" clip-rule="nonzero" />
              </clipPath>
            </defs>
            <g id="g15" clip-path="url(#id1)" transform="translate(-75.931091,-75.378906)">
              <path
                id="path13"
                fill="#c30f2e"
                d="M 237.43359,75.378906 347.57031,267.52734 H 127.29688 L 237.43359,75.378906"
                fill-opacity="1"
                fill-rule="nonzero"
              />
            </g>
            <g id="g19" clip-path="url(#id2)" transform="translate(-75.931091,-75.378906)">
              <path
                id="path17"
                fill="#dd0330"
                d="m 169.60156,104 93.73047,164.03125 H 75.871094 L 169.60156,104"
                fill-opacity="1"
                fill-rule="nonzero"
              />
            </g>
            <path
              id="path21"
              fill="#ffffff"
              d="M 252.96344,143.58984 H 19.221253 v -2.56641 H 252.96344 v 2.56641"
              fill-opacity="1"
              fill-rule="nonzero"
            />
            <g id="g25" clip-path="url(#id3)" transform="translate(-75.931091,-75.378906)">
              <path
                id="path23"
                fill="#ffffff"
                d="m 292.78516,256.51172 c -0.91407,0 -1.77344,-0.37891 -2.49219,-1.09766 -4.29297,-4.3125 -4.48047,-21.84765 -4.27344,-48.10937 0.11719,-14.35157 0.27344,-34.00782 -2.01562,-35.5586 -2.23438,0.92578 -2.45704,17.16407 -2.60157,27.91407 -0.17187,12.50781 -0.34765,25.44921 -2.3789,32.03906 -0.60547,1.95312 -1.38672,3.74219 -2.95703,3.59765 -2.21485,-0.19531 -2.92969,-3.6914 -4.58204,-17.48828 -0.6875,-5.73047 -1.39843,-11.65234 -2.23046,-13.94531 -0.10938,-0.28906 -0.20313,-0.51953 -0.28516,-0.69922 -0.88672,2.00391 -1.91016,7.51172 -2.62109,11.33594 -0.98438,5.28125 -1.91407,10.26953 -3.07813,12.44531 -0.89844,1.67188 -2.32422,3.85156 -4.31641,3.42969 -2.71484,-0.57031 -3.52734,-6.04297 -3.76953,-9.25391 0,-27.01562 -3.53515,-30.16015 -4.24218,-30.51562 l -0.11329,0.0859 -0.17187,-0.0391 c -2.52344,1.10157 -2.66016,9.86328 -2.78906,18.33594 -0.10157,6.21484 -0.21094,13.25781 -1.11719,19.84766 -1.17578,8.54297 -2.59766,10.1914 -4.36719,10.08984 -4.07422,-0.27734 -4.1914,-14.30859 -4.1914,-15.90625 0,-0.5 0.0117,-1.08984 0.0273,-1.74219 0.0781,-3.26562 0.21875,-9.33984 -1.78906,-11.2539 -0.26563,-0.25391 -0.64063,-0.54688 -0.9336,-0.46485 -1.42968,0.35938 -2.91406,5.00391 -3.40625,6.53125 -0.15625,0.48438 -0.28125,0.88282 -0.38672,1.15625 -0.082,0.22657 -0.1875,0.54688 -0.3125,0.9336 -1.08203,3.28515 -2.3125,6.5625 -4.41406,7.37109 -0.77734,0.30078 -1.58984,0.23438 -2.35156,-0.19531 -1.01172,-0.57422 -1.83594,-1.7461 -2.60547,-3.69531 -0.42187,-1.07813 -0.78125,-2.17188 -1.14844,-3.26954 -0.44531,-1.33984 -0.90234,-2.72656 -1.46875,-4.04296 -0.44531,-1.02344 -1.55468,-1.48438 -2.96875,-1.23438 -2.9375,0.52344 -3.42968,3.49219 -3.84375,7.96094 -0.0742,0.77734 -0.14453,1.53906 -0.24218,2.25781 -0.0117,0.21094 -0.53125,6.76953 -0.86329,8.85547 -0.91796,5.71875 -2.125,7.97266 -4.1289,7.80859 -4.94531,-0.42187 -7.21485,-22.11328 -7.09375,-31.27734 0.0937,-6.99609 -1.17188,-9.55078 -1.92969,-9.95703 -0.0781,-0.0352 -0.19922,-0.10156 -0.48828,0.10156 -0.89453,0.60547 -1.69141,2.49219 -1.44531,4.47266 2.72265,21.5664 0.71484,46.26562 -4.20313,51.82812 -1.55078,1.75 -3.66015,1.72656 -5.1289,0.25 -4.29688,-4.3125 -4.47657,-21.84765 -4.27344,-48.10937 0.11719,-14.35157 0.26953,-34.00782 -2.01563,-35.5586 -2.23437,0.92578 -2.45312,17.16407 -2.60156,27.91407 -0.17187,12.50781 -0.34766,25.44921 -2.38281,32.03906 -0.60547,1.95312 -1.38672,3.74219 -2.95313,3.59765 -2.21875,-0.19531 -2.92968,-3.6914 -4.58593,-17.48828 -0.6875,-5.73047 -1.39844,-11.65234 -2.23047,-13.94531 -0.10547,-0.28906 -0.19922,-0.51953 -0.28516,-0.69922 -0.88281,2.00391 -1.90625,7.51172 -2.61719,11.33594 -0.98437,5.28125 -1.91406,10.26953 -3.08203,12.44531 -0.89844,1.67188 -2.32422,3.85156 -4.3125,3.42969 -2.71484,-0.57031 -3.52734,-6.04297 -3.76953,-9.25391 -0.004,-27.01562 -3.53516,-30.16015 -4.24219,-30.51562 l -0.11328,0.0859 -0.17578,-0.0391 c -2.51953,1.10157 -2.65625,9.86328 -2.78906,18.33594 -0.0977,6.21484 -0.20703,13.25781 -1.11328,19.84766 -1.17578,8.54297 -2.58594,10.20703 -4.36328,10.08984 -4.08204,-0.27734 -4.19922,-14.30859 -4.19922,-15.90625 0,-0.5 0.0156,-1.08984 0.0312,-1.74219 0.0781,-3.26562 0.21875,-9.33984 -1.78907,-11.2539 -0.26562,-0.25391 -0.64062,-0.54688 -0.93359,-0.46485 -1.42969,0.35938 -2.91797,5.00391 -3.40234,6.53125 -0.15625,0.48047 -0.28907,0.88282 -0.38672,1.15625 -0.0859,0.22266 -0.19141,0.54297 -0.31641,0.92969 -1.08203,3.28516 -2.3125,6.56641 -4.41015,7.375 -0.78125,0.30078 -1.59766,0.23438 -2.35547,-0.19531 -1.01172,-0.57422 -1.83985,-1.7461 -2.60547,-3.69531 -0.42188,-1.07813 -0.78516,-2.17188 -1.14844,-3.26954 -0.44531,-1.33984 -0.90625,-2.72656 -1.47265,-4.04296 -0.44141,-1.02344 -1.55469,-1.48438 -2.96875,-1.23438 -3.38282,0.60156 -4.1836,4.79688 -4.82813,9.80469 l -0.11328,0.89062 -2.55859,-0.33984 0.12109,-0.875 c 0.55859,-4.39063 1.41016,-11.02734 6.92969,-12.00391 2.59765,-0.46093 4.86718,0.61719 5.78125,2.74219 0.61328,1.42188 1.09375,2.85938 1.55468,4.25391 0.34375,1.05078 0.69532,2.10156 1.10157,3.14062 0.71484,1.8125 1.26953,2.28125 1.47656,2.39453 1.29297,-0.40234 2.61328,-4.42187 3.05078,-5.74609 0.13672,-0.42578 0.25391,-0.77734 0.34766,-1.02734 0.0898,-0.2461 0.20703,-0.60547 0.34765,-1.03907 1.16407,-3.64062 2.625,-7.58203 5.21875,-8.23828 0.79297,-0.20312 2.01953,-0.17578 3.35156,1.09766 2.82813,2.69922 2.67969,9 2.58204,13.17187 -0.0156,0.625 -0.0312,1.19532 -0.0312,1.67969 0,6.65625 0.98828,11.30859 1.74218,12.90625 0.39063,-0.81641 1.0586,-2.79297 1.69532,-7.4375 0.88281,-6.4375 0.99609,-13.39844 1.08984,-19.53906 0.17187,-10.86719 0.29297,-18.7461 4.22656,-20.59766 0.58594,-0.35937 1.5586,-0.55469 2.58594,-0.0352 3.80469,1.91406 5.65234,12.61328 5.65234,32.70703 0.23828,3.10547 1.07422,6.375 1.76172,6.84375 0.004,-0.0703 0.5625,-0.41407 1.48047,-2.13282 0.98047,-1.82421 1.95703,-7.07421 2.81641,-11.70312 1.90234,-10.20313 2.76562,-13.78516 5.01562,-13.97266 1.71485,-0.16797 2.50781,2.01172 2.83985,2.92969 0.9375,2.57031 1.63281,8.37109 2.36718,14.51563 0.57422,4.76562 1.39063,11.57031 2.22266,14.32421 0.0898,-0.24218 0.19141,-0.53125 0.30078,-0.88671 1.92578,-6.23829 2.10156,-18.98438 2.26953,-31.31641 0.23438,-17.12891 0.53516,-27.74219 3.66016,-29.95703 0.69531,-0.49219 1.54297,-0.61328 2.37109,-0.33594 3.66016,1.21484 3.94141,11.94531 3.73438,37.99609 -0.14844,18.89063 -0.33203,42.40235 3.52734,46.27735 0.33594,0.33984 0.57422,0.33984 0.66016,0.33984 0.17968,0 0.4375,-0.17187 0.71093,-0.48047 3.90625,-4.41797 6.37891,-27.61718 3.57813,-49.80468 -0.34766,-2.76172 0.71875,-5.66407 2.53906,-6.91407 1.00391,-0.6914 2.16016,-0.78125 3.16016,-0.24609 2.27734,1.21094 3.38281,5.33203 3.29297,12.25391 -0.16016,12.08593 2.74218,26.23046 4.63672,28.48828 0.30078,-0.5 0.89453,-1.8711 1.46484,-5.46094 0.32031,-1.98438 0.84766,-8.65234 0.85547,-8.71875 0.0937,-0.75391 0.16406,-1.48438 0.23047,-2.22656 0.39062,-4.16407 0.87109,-9.34375 5.95703,-10.2461 2.59375,-0.46093 4.86328,0.61328 5.78125,2.74219 0.61328,1.42188 1.08984,2.85938 1.55078,4.25391 0.35156,1.05078 0.70312,2.10156 1.10937,3.14062 0.71094,1.8125 1.26954,2.28125 1.47266,2.39453 1.29297,-0.40234 2.61719,-4.42187 3.05078,-5.74218 0.14063,-0.42579 0.25781,-0.78125 0.34766,-1.03125 0.0937,-0.24219 0.20703,-0.60547 0.34375,-1.03907 1.16797,-3.64062 2.6289,-7.58203 5.22656,-8.23828 0.78516,-0.20312 2.01563,-0.17578 3.34766,1.09766 2.82812,2.69922 2.67968,9 2.58593,13.17187 -0.0195,0.625 -0.0352,1.19532 -0.0352,1.67969 0,6.65625 0.98828,11.30859 1.74219,12.90625 0.38671,-0.81641 1.05468,-2.79297 1.69921,-7.4375 0.88282,-6.4375 0.98829,-13.39844 1.08985,-19.53906 0.16797,-10.86719 0.28906,-18.7461 4.22265,-20.59766 0.58594,-0.35937 1.5586,-0.55469 2.58985,-0.0352 3.80078,1.91406 5.65234,12.61328 5.65234,32.70703 0.23828,3.10547 1.07422,6.375 1.75781,6.84375 0.008,-0.0703 0.5586,-0.41407 1.48438,-2.13282 0.98047,-1.82421 1.95312,-7.07421 2.81641,-11.70312 1.89453,-10.20313 2.76171,-13.78516 5.01171,-13.97266 1.71875,-0.16797 2.51172,2.01172 2.84375,2.92969 0.9336,2.57031 1.62891,8.37109 2.3711,14.51563 0.5664,4.76562 1.38281,11.57031 2.21875,14.32421 0.0859,-0.24218 0.1875,-0.53125 0.29687,-0.88671 1.92578,-6.23829 2.09766,-18.98438 2.26953,-31.31641 0.23047,-17.12891 0.53516,-27.74219 3.66016,-29.95703 0.69922,-0.49219 1.54297,-0.61328 2.37109,-0.33594 3.66407,1.21484 3.94532,11.94531 3.73438,37.99609 -0.14844,18.89063 -0.33203,42.40235 3.52344,46.27735 0.34375,0.33984 0.57812,0.33984 0.66797,0.33984 0.17578,0 0.43359,-0.17187 0.70312,-0.48047 3.91406,-4.41797 6.38281,-27.61718 3.58203,-49.80468 -0.36328,-2.89063 0.45703,-5.80469 1.95313,-6.92579 0.7539,-0.57031 1.67187,-0.6875 2.51562,-0.33203 2.17969,0.92969 3.65625,4.91407 4.51563,12.1875 0.35937,3.04688 0.67968,6.33985 0.98828,9.58985 0.67969,7.09375 1.60156,16.65234 2.84765,18.7539 0.38282,-0.48828 1.16407,-1.80859 2.32422,-5.34765 l 2.44922,0.80078 c -1.80078,5.47265 -3.21094,7.53515 -5.04687,7.32422 -2.85547,-0.31641 -3.67969,-6.08594 -5.13672,-21.28516 -0.3086,-3.23437 -0.625,-6.50781 -0.98438,-9.53906 -1.09375,-9.27735 -2.95312,-10.11719 -2.97265,-10.125 -0.36328,0.18359 -1.20703,2.11328 -0.89453,4.57422 2.71484,21.5664 0.71484,46.26953 -4.20704,51.82812 -0.79296,0.89453 -1.68359,1.34766 -2.63671,1.34766"
                fill-opacity="1"
                fill-rule="nonzero"
              />
            </g>
          </svg>
          <a
            target="_blank"
            href="https://twitter.com/analogjs"
            class="rounded-2xl bg-zinc-200 px-4 py-1.5 text-sm font-medium"
          >
            Follow along on Twitter
          </a>
          <h1 class="font-heading text-3xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
            <span class="text-[#DD0031]">Analog.</span>
            The fullstack Angular meta-framework
          </h1>
          <p class="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Analog is for building applications and websites with Angular.
            <br />
            Powered by Vite.
          </p>
          <div class="space-x-4">
            <a
              href="https://analogjs.org"
              class="inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-8 text-sm font-medium text-zinc-50 ring-offset-background transition-colors hover:bg-zinc-950/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Read the docs
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/analogjs/analog"
              class="inline-flex h-11 items-center justify-center rounded-md border border-input px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-zinc-50 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section>
        <div sprenAccordion value="2" collapsible>
          <div sprenAccordionItem value="1">
            <h3>
              <button sprenAccordionTrigger>Section 1 title</button>
            </h3>
            <div sprenAccordionContent>Panel 1</div>
          </div>
          <div sprenAccordionItem value="2">
            <h3>
              <button sprenAccordionTrigger>Section 2 title</button>
            </h3>
            <div sprenAccordionContent>Panel 2</div>
          </div>
          <div sprenAccordionItem value="3" disabled>
            <h3>
              <button sprenAccordionTrigger>Section 3 title disabled</button>
            </h3>
            <div sprenAccordionContent>Panel 3</div>
          </div>
        </div>
      </section>

      <section class="mt-4">
        <label
          sprenCheckbox
          class="flex cursor-pointer items-center gap-2 data-[disabled]:cursor-not-allowed"
          [checked]="true"
          #c="checkbox"
        >
          <span
            sprenCheckboxLabel
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70"
          >
            Checkbox
          </span>
          <input sprenCheckboxInput class="peer" />
          <div
            sprenCheckboxControl
            class="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background
      peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2
      peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[checked]:bg-primary data-[indeterminate]:bg-primary
      data-[checked]:text-primary-foreground data-[indeterminate]:text-primary-foreground"
          >
            <span class="flex items-center justify-center text-current">
              <svg
                *ngIf="c.checkbox().isChecked"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-3"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg
                *ngIf="c.checkbox().isIndeterminate"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="-mt-px h-4 w-3"
              >
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </span>
          </div>
        </label>
      </section>

      <section id="counter-demo" class="container py-8 md:py-12 lg:py-24">
        <div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 class="text-3xl font-medium leading-[1.1] text-[#DD0031]">Counter</h2>
          <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This is a simple interactive counter. Powered by Angular.
          </p>
          <button
            class="inline-flex h-11 items-center justify-center rounded-md border border-input px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-zinc-50 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            (click)="increment()"
          >
            Count:
            <span class="ml-1 font-mono">{{ count }}</span>
          </button>
        </div>
      </section>
    </main>
  `,
})
export class AnalogWelcomeComponent {
  public count = 0;
  public increment() {
    this.count++;
  }
}
