<template>
  <Breadcrumbs :pages="pages" />
  <div class="p-10">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <nav aria-label="Progress">
          <ol class="overflow-hidden">
            <li
              v-for="(step, stepIdx) in steps"
              :key="step.name"
              :class="[
                stepIdx !== steps.length - 1 && !existingMerchant
                  ? 'pb-10'
                  : '',
                'relative',
                existingMerchant && stepIdx >= 5 ? 'pb-0' : 'pb-10',
              ]"
            >
              <template v-if="step.status === 'complete'">
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="
                    -ml-px
                    absolute
                    mt-0.5
                    top-4
                    left-4
                    w-0.5
                    h-full
                    bg-indigo-600
                  "
                  aria-hidden="true"
                />
                <button
                  @click="stepperClick(stepIdx)"
                  class="relative flex items-start group focus:outline-none"
                  type="button"
                >
                  <span class="h-9 flex items-center">
                    <span
                      class="
                        relative
                        z-10
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        bg-indigo-600
                        rounded-full
                        group-hover:bg-indigo-800
                      "
                    >
                      <CheckIcon
                        class="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span class="ml-4 min-w-0 flex flex-col text-left">
                    <span
                      class="text-xs font-semibold tracking-wide uppercase"
                      >{{ step.name }}</span
                    >
                    <span class="text-sm text-gray-500">{{
                      step.description
                    }}</span>
                  </span>
                </button>
              </template>
              <template
                v-else-if="step.status === 'current'"
                condition="step.status === 'current'"
              >
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="
                    -ml-px
                    absolute
                    mt-0.5
                    top-4
                    left-4
                    w-0.5
                    h-full
                    bg-gray-300
                  "
                  aria-hidden="true"
                />
                <button
                  @click="stepperClick(stepIdx)"
                  class="relative flex items-start group focus:outline-none"
                  aria-current="step"
                  type="button"
                >
                  <span class="h-9 flex items-center" aria-hidden="true">
                    <span
                      class="
                        relative
                        z-10
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        bg-white
                        border-2 border-indigo-600
                        rounded-full
                      "
                    >
                      <span class="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                    </span>
                  </span>
                  <span class="ml-4 min-w-0 flex flex-col text-left">
                    <span
                      class="
                        text-xs
                        font-semibold
                        tracking-wide
                        uppercase
                        text-indigo-600
                      "
                      >{{ step.name }}</span
                    >
                    <span class="text-sm text-gray-500">{{
                      step.description
                    }}</span>
                  </span>
                </button>
              </template>
              <template v-else>
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="
                    -ml-px
                    absolute
                    mt-0.5
                    top-4
                    left-4
                    w-0.5
                    h-full
                    bg-gray-300
                  "
                  aria-hidden="true"
                />
                <button
                  @click="stepperClick(stepIdx)"
                  class="relative flex items-start group focus:outline-none"
                  v-if="!existingMerchant"
                  type="button"
                >
                  <span class="h-9 flex items-center" aria-hidden="true">
                    <span
                      class="
                        relative
                        z-10
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        bg-white
                        border-2 border-gray-300
                        rounded-full
                        group-hover:border-gray-400
                      "
                    >
                      <span
                        class="
                          h-2.5
                          w-2.5
                          bg-transparent
                          rounded-full
                          group-hover:bg-gray-300
                        "
                      />
                    </span>
                  </span>
                  <span class="ml-4 min-w-0 flex flex-col text-left">
                    <span
                      class="
                        text-xs
                        font-semibold
                        tracking-wide
                        uppercase
                        text-gray-500
                      "
                      >{{ step.name }}</span
                    >
                    <span class="text-sm text-gray-500">{{
                      step.description
                    }}</span>
                  </span>
                </button>
              </template>
            </li>
          </ol>
        </nav>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form id="form0" @submit.prevent="searchMerchantEmail(form.email)">
          <div
            class="shadow overflow-hidden sm:rounded-md"
            v-if="currentStep == 0"
          >
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <!-- step 1 -->
                <div class="col-span-6">
                  <p class="text-base font-medium text-indigo-700">
                    Step 1 <span class="text-xs text-gray-500">/ 8</span> -
                    Merchant Verification
                  </p>
                </div>
                <div class="col-span-6">
                  <label
                    for="email_address"
                    class="block text-sm font-medium text-gray-700"
                    >Email address</label
                  >
                  <input
                    type="email"
                    v-model="form.email"
                    required
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
              </div>
            </div>
            <div
              class="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end"
            >
              <button
                id="button0"
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Next
              </button>
            </div>
          </div>
        </form>
        <form id="form1" @submit.prevent="goTo(3, 'next')">
          <div
            class="shadow overflow-hidden sm:rounded-md"
            v-if="currentStep == 1"
          >
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <!-- step 2 -->
                <div class="col-span-6">
                  <p class="text-base font-medium text-indigo-700">
                    Step 2 <span class="text-xs text-gray-500">/ 8</span> -
                    Merchant Information
                  </p>
                </div>
                <div class="col-span-6">
                  <label
                    for="email_address"
                    class="block text-sm font-medium text-gray-700"
                    >Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    v-model="form.name"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="email_address"
                    class="block text-sm font-medium text-gray-700"
                    >Business Name (DBA)</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.businessName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
              </div>
            </div>
            <div
              class="
                px-4
                py-3
                bg-gray-50
                text-right
                sm:px-6
                flex
                justify-between
              "
            >
              <button
                type="button"
                @click="goTo(1, 'back')"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Previous
              </button>
              <button
                id="button1"
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Next
              </button>
            </div>
          </div>
        </form>
        <form id="form2" @submit.prevent="goTo(4, 'next')">
          <div
            class="shadow overflow-hidden sm:rounded-md"
            v-if="currentStep == 2"
          >
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <!-- step 3 -->
                <div class="col-span-6">
                  <p class="text-base font-medium text-indigo-700">
                    Step 3 <span class="text-xs text-gray-500">/ 8</span> -
                    Merchant Address
                  </p>
                </div>
                <div class="col-span-6">
                  <p class="text-base font-medium text-gray-900">
                    Physical Address
                  </p>
                </div>
                <div class="col-span-6">
                  <label
                    for="street_address"
                    class="block text-sm font-medium text-gray-700"
                    >Street address</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.streetAddress"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >City</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.city"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    for="state"
                    class="block text-sm font-medium text-gray-700"
                    >State / Province</label
                  >
                  <input
                    type="text"
                    v-maska="'AA'"
                    required
                    v-model="form.state"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    for="postal_code"
                    class="block text-sm font-medium text-gray-700"
                    >ZIP / Postal</label
                  >
                  <input
                    type="text"
                    v-maska="'#####'"
                    placeholder="#####"
                    required
                    v-model="form.zipCode"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="country"
                    class="block text-sm font-medium text-gray-700"
                    >Country / Region</label
                  >
                  <input
                    type="text"
                    required
                    readonly
                    v-model="form.country"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Corporate Phone</label
                  >
                  <input
                    type="text"
                    v-maska="'(###) ###-####'"
                    placeholder="(###) ###-####"
                    required
                    v-model="form.phoneNumber"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-gray-700"
                    >Fax</label
                  >
                  <input
                    type="text"
                    v-maska="'(###) ###-####'"
                    placeholder="(###) ###-####"
                    v-model="form.faxNumber"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6">
                  <p class="text-base font-medium text-gray-900">
                    Legal Address
                  </p>
                  <div class="flex items-center pt-2">
                    <div class="flex items-center h-5">
                      <input
                        v-model="isSameAdrress"
                        type="checkbox"
                        class="
                          focus:ring-indigo-500
                          h-4
                          w-4
                          text-indigo-600
                          border-gray-300
                          rounded
                        "
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="comments"
                        class="font-medium text-xs text-gray-700"
                        >Same as Physical Address</label
                      >
                    </div>
                  </div>
                </div>
                <span
                  v-if="!isSameAdrress"
                  class="md:grid md:grid-cols-3 md:gap-6 col-span-6"
                >
                  <div class="col-span-6">
                    <label
                      for="street_address"
                      class="block text-sm font-medium text-gray-700"
                      >Street address</label
                    >
                    <input
                      type="text"
                      required
                      v-model="form.physical_streetAddress"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      for="city"
                      class="block text-sm font-medium text-gray-700"
                      >City</label
                    >
                    <input
                      type="text"
                      required
                      v-model="form.physical_city"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="state"
                      class="block text-sm font-medium text-gray-700"
                      >State / Province</label
                    >
                    <!-- <select class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>                 -->
                    <input
                      type="text"
                      v-maska="'AA'"
                      required
                      v-model="form.physical_state"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="postal_code"
                      class="block text-sm font-medium text-gray-700"
                      >ZIP / Postal</label
                    >
                    <input
                      type="text"
                      v-maska="'#####'"
                      placeholder="#####"
                      required
                      v-model="form.physical_zipCode"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div class="col-span-6">
                    <label
                      for="country"
                      class="block text-sm font-medium text-gray-700"
                      >Country / Region</label
                    >
                    <input
                      type="text"
                      readonly
                      required
                      v-model="form.physical_country"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                      >Corporate Phone</label
                    >
                    <input
                      type="text"
                      v-maska="'(###) ###-####'"
                      placeholder="(###) ###-####"
                      required
                      v-model="form.physical_phoneNumber"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="last_name"
                      class="block text-sm font-medium text-gray-700"
                      >Fax</label
                    >
                    <input
                      type="text"
                      v-maska="'(###) ###-####'"
                      placeholder="(###) ###-####"
                      v-model="form.physical_faxNumber"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </span>
              </div>
            </div>
            <div
              class="
                px-4
                py-3
                bg-gray-50
                text-right
                sm:px-6
                flex
                justify-between
              "
            >
              <button
                type="button"
                @click="goTo(2, 'back')"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Previous
              </button>
              <button
                id="button2"
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Next
              </button>
            </div>
          </div>
        </form>
        <form id="form3" @submit.prevent="goTo(0, 'next')">
          <div
            class="shadow overflow-hidden sm:rounded-md"
            v-if="currentStep == 3"
          >
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <!-- step 4 -->
                <div class="col-span-6">
                  <p class="text-base font-medium text-indigo-700">
                    Step 4 <span class="text-xs text-gray-500">/ 8</span> -
                    Business Entity
                  </p>
                </div>
                <div class="col-span-6">
                  <RadioGroup v-model="form.business_entity">
                    <RadioGroupLabel class="sr-only">
                      Server size
                    </RadioGroupLabel>
                    <div class="grid grid-cols-2 gap-4">
                      <RadioGroupOption
                        as="template"
                        v-for="entity in businessEntities"
                        :key="entity.name"
                        :value="entity"
                        v-slot="{ active, checked }"
                      >
                        <div
                          :class="[
                            active
                              ? 'ring-1 ring-offset-2 ring-indigo-500'
                              : '',
                            'relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none',
                          ]"
                        >
                          <div class="flex items-center">
                            <div class="text-sm">
                              <RadioGroupLabel
                                as="p"
                                class="font-medium text-gray-900"
                              >
                                {{ entity.name }}
                              </RadioGroupLabel>
                              <RadioGroupDescription
                                as="div"
                                class="text-gray-500"
                              >
                                <p class="sm:inline">
                                  {{ entity.description }}
                                </p>
                              </RadioGroupDescription>
                            </div>
                          </div>
                          <div
                            :class="[
                              checked
                                ? 'border-indigo-500'
                                : 'border-transparent',
                              'absolute -inset-px rounded-lg border-2 pointer-events-none',
                            ]"
                            aria-hidden="true"
                          />
                        </div>
                      </RadioGroupOption>
                      <div>
                        <label
                          for="first_name"
                          class="block text-sm font-medium text-gray-700"
                          >Other business entiy</label
                        >
                        <input
                          type="text"
                          v-model="form.other_business_entity"
                          class="
                            mt-1
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          "
                        />
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div
              class="
                px-4
                py-3
                bg-gray-50
                text-right
                sm:px-6
                flex
                justify-between
              "
            >
              <button
                type="button"
                @click="goTo(3, 'back')"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Previous
              </button>
              <button
                id="button3"
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Next
              </button>
            </div>
          </div>
        </form>
        <form id="form4" @submit.prevent="goTo(6, 'next')">
          <div
            class="shadow overflow-hidden sm:rounded-md"
            v-if="currentStep == 4"
          >
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <!-- step 5 -->
                <div class="col-span-6">
                  <p class="text-base font-medium text-indigo-700">
                    Step 5 <span class="text-xs text-gray-500">/ 8</span> -
                    Business Information
                  </p>
                </div>
                <div class="col-span-6">
                  <p class="text-base font-medium text-gray-900">Owner 1</p>
                  <div class="flex items-center pt-2">
                    <div class="flex items-center h-5">
                      <input
                        type="checkbox"
                        v-model="form.markOwner1AsPrimaryContact"
                        @click="populatePrimaryContact(1)"
                        class="
                          focus:ring-indigo-500
                          h-4
                          w-4
                          text-indigo-600
                          border-gray-300
                          rounded
                        "
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="comments"
                        class="font-medium text-xs text-gray-700"
                        >Mark as Primary Contact</label
                      >
                    </div>
                  </div>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >First Name</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.owner1FirstName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-gray-700"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.owner1LastName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-4" v-if="primaryOwner === 1">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Birth date</label
                  >
                  <input
                    type="date"
                    @change="selectBirthDate($event)"
                    required
                    v-model="form.birthDate"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6">
                  <p class="text-base font-medium text-gray-900">Owner 2</p>
                  <div class="flex items-center pt-2">
                    <div class="flex items-center h-5">
                      <input
                        type="checkbox"
                        v-model="form.markOwner2AsPrimaryContact"
                        @click="populatePrimaryContact(2)"
                        class="
                          focus:ring-indigo-500
                          h-4
                          w-4
                          text-indigo-600
                          border-gray-300
                          rounded
                        "
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="comments"
                        class="font-medium text-xs text-gray-700"
                        >Mark as Primary Contact</label
                      >
                    </div>
                  </div>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >First Name</label
                  >
                  <input
                    type="text"
                    v-model="form.owner2FirstName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-gray-700"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    v-model="form.owner2LastName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-4" v-if="primaryOwner === 2">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Birth date</label
                  >
                  <input
                    type="date"
                    @change="selectBirthDate($event)"
                    required
                    v-model="form.birthDate"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6">
                  <p class="text-base font-medium text-gray-900">
                    Primary Contact Person
                  </p>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Full Name</label
                  >
                  <input
                    type="text"
                    v-model="form.primaryContactName"
                    required
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-gray-700"
                    >Job Title</label
                  >
                  <input
                    type="text"
                    v-model="form.title"
                    required
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6">
                  <p class="text-base font-medium text-gray-900">
                    Other Business Details
                  </p>
                </div>
                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    for="street_address"
                    class="block text-sm font-medium text-gray-700"
                    >Federal Tax ID Number</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.idNumber"
                    v-maska="'#########'"
                    placeholder="#########"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    for="street_address"
                    class="block text-sm font-medium text-gray-700"
                    >Tin Type</label
                  >
                  <span
                    class="
                      relative
                      z-0
                      inline-flex
                      shadow-sm
                      rounded-md
                      mt-1
                      w-full
                    "
                  >
                    <button
                      type="button"
                      @click="updateTinType('ein')"
                      :class="{
                        'bg-indigo-500 text-white hover:text-gray-500':
                          form.tinType == 'ein',
                        'text-gray-500': form.tinType != 'ein',
                      }"
                      class="
                        w-full
                        relative
                        inline-flex
                        items-center
                        px-2
                        py-2
                        rounded-l-md
                        border border-gray-300
                        bg-white
                        text-sm
                        font-medium
                        hover:bg-gray-50
                        focus:z-10
                        focus:outline-none
                        focus:ring-1 focus:ring-indigo-500
                        focus:border-indigo-500
                      "
                    >
                      EIN
                    </button>
                    <button
                      type="button"
                      @click="updateTinType('ssn')"
                      :class="{
                        'bg-indigo-500 text-white hover:text-gray-500':
                          form.tinType == 'ssn',
                        'text-gray-500': form.tinType != 'ssn',
                      }"
                      class="
                        w-full
                        -ml-px
                        relative
                        inline-flex
                        items-center
                        px-2
                        py-2
                        rounded-r-md
                        border border-gray-300
                        bg-white
                        text-sm
                        font-medium
                        hover:bg-gray-50
                        focus:z-10
                        focus:outline-none
                        focus:ring-1 focus:ring-indigo-500
                        focus:border-indigo-500
                      "
                    >
                      SSN
                    </button>
                  </span>
                </div>
                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    for="street_address"
                    class="block text-sm font-medium text-gray-700"
                    >Is State-Issued Regulatory or Business License</label
                  >
                  <Switch
                    @click="showLicenseFields = !showLicenseFields"
                    v-model="isStateIssued"
                    :class="[
                      isStateIssued ? 'bg-indigo-600' : 'bg-gray-200',
                      'mt-3  relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    ]"
                  >
                    <span class="sr-only">Use setting</span>
                    <span
                      :class="[
                        isStateIssued ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      ]"
                    >
                      <span
                        :class="[
                          isStateIssued
                            ? 'opacity-0 ease-out duration-100'
                            : 'opacity-100 ease-in duration-200',
                          'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                        ]"
                        aria-hidden="true"
                      >
                        <svg
                          class="h-3 w-3 text-gray-400"
                          fill="none"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      <span
                        :class="[
                          isStateIssued
                            ? 'opacity-100 ease-in duration-200'
                            : 'opacity-0 ease-out duration-100',
                          'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                        ]"
                        aria-hidden="true"
                      >
                        <svg
                          class="h-3 w-3 text-indigo-600"
                          fill="currentColor"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                          />
                        </svg>
                      </span>
                    </span>
                  </Switch>
                </div>

                <div class="col-span-6 sm:col-span-3" v-if="showLicenseFields">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >License Number</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.businessLicense"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3" v-if="showLicenseFields">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >State</label
                  >
                  <input
                    type="text"
                    v-maska="'AA'"
                    required
                    v-model="form.businessLicenseState"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-1">
                  <label
                    for="street_address"
                    class="block text-sm font-medium text-gray-700"
                    >Has Multiple Locations</label
                  >
                  <Switch
                    @click="showMultipleFields = !showMultipleFields"
                    v-model="hasMultipleLocation"
                    :class="[
                      hasMultipleLocation ? 'bg-indigo-600' : 'bg-gray-200',
                      'mt-3  relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    ]"
                  >
                    <span class="sr-only">Use setting</span>
                    <span
                      :class="[
                        hasMultipleLocation ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      ]"
                    >
                      <span
                        :class="[
                          hasMultipleLocation
                            ? 'opacity-0 ease-out duration-100'
                            : 'opacity-100 ease-in duration-200',
                          'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                        ]"
                        aria-hidden="true"
                      >
                        <svg
                          class="h-3 w-3 text-gray-400"
                          fill="none"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      <span
                        :class="[
                          hasMultipleLocation
                            ? 'opacity-100 ease-in duration-200'
                            : 'opacity-0 ease-out duration-100',
                          'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                        ]"
                        aria-hidden="true"
                      >
                        <svg
                          class="h-3 w-3 text-indigo-600"
                          fill="currentColor"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                          />
                        </svg>
                      </span>
                    </span>
                  </Switch>
                </div>

                <div class="col-span-6 sm:col-span-1" v-if="showMultipleFields">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Number of Locations</label
                  >
                  <input
                    type="number"
                    min="1"
                    required
                    v-model="form.numberOfLocations"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Business Formation</label
                  >
                  <input
                    type="date"
                    required
                    v-model="form.businessFormationDate"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                  <p>
                    Time of Business:
                    {{ moment().diff(form.businessFormationDate, "years") }}
                    years
                  </p>
                </div>
              </div>
            </div>
            <div
              class="
                px-4
                py-3
                bg-gray-50
                text-right
                sm:px-6
                flex
                justify-between
              "
            >
              <button
                type="button"
                @click="goTo(4, 'back')"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Previous
              </button>
              <button
                id="button4"
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Next
              </button>
            </div>
          </div>
        </form>
        <form id="form5" @submit.prevent="checkSubmitLink">
          <div
            class="shadow overflow-hidden sm:rounded-md"
            v-if="currentStep == 5"
          >
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <!-- step 6 -->
                <div class="col-span-6">
                  <p class="text-base font-medium text-indigo-700">
                    Step 6 <span class="text-xs text-gray-500">/ 8</span> - Cash
                    Advance Details
                  </p>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Principal Amount
                  </label>
                  <input
                    type="text"
                    required
                    v-model="form.principalAmount"
                    @focus="clearfield()"
                    @blur="formatCurrency(form.principalAmount)"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Factor Rate</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.factorRate"
                    v-maska="'#.####'"
                    placeholder="#.####"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Origination Fee
                  </label>
                  <input
                    type="text"
                    required
                    v-model="form.originationFee"
                    v-maska="['# %', '#.# %', '#.## %']"
                    placeholder="#.## %"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Origination Fee Amount
                  </label>
                  <input
                    type="text"
                    required
                    readonly
                    v-model="form.originationFeeAmount"
                    v-money3="money"
                    class="
                      bg-gray-100
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Disbursed Amount</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.disbursedAmount"
                    v-money3="money"
                    readonly
                    class="
                      bg-gray-100
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Payback Amount</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.paybackAmount"
                    v-money3="money"
                    readonly
                    class="
                      bg-gray-100
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 grid grid-cols-2 gap-4">
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                      >Date of Coverage
                      <span
                        class="text-indigo-500 font-bold"
                        v-show="form.numberOfDays > 1"
                        >({{ form.numberOfDays }} days)</span
                      ></label
                    >
                    <input
                      type="date"
                      required
                      v-model="form.startDate"
                      :min="setStartDate"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-transparent"
                      >Date of Coverage
                    </label>
                    <input
                      type="date"
                      required
                      v-model="form.endDate"
                      :min="getStartDate"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                      >Payment Frequency</label
                    >
                    <input
                      type="text"
                      required
                      readonly
                      v-model="form.paymentFrequency"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                      >Repayment Type</label
                    >
                    <select
                      required
                      v-model="form.repaymentType"
                      class="
                        mt-1
                        block
                        w-full
                        py-2
                        px-3
                        border border-gray-300
                        bg-white
                        rounded-md
                        shadow-sm
                        focus:outline-none
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        sm:text-sm
                      "
                    >
                      <option value="daily_fixed_amount">
                        Daily Fixed Amount
                      </option>
                      <option value="daily_witholding">Daily Witholding</option>
                    </select>
                  </div>
                </div>
                <div
                  class="col-span-6"
                  v-if="form.repaymentType == 'daily_witholding'"
                >
                  <div>
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                      >Witholding Percentage</label
                    >
                    <input
                      type="text"
                      required
                      v-model="form.withHoldingPercentage"
                      v-maska="['# %', '#.# %', '#.## %', '##.## %']"
                      placeholder="##.## %"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                px-4
                py-3
                bg-gray-50
                text-right
                sm:px-6
                flex
                justify-between
              "
            >
              <button
                v-if="!existingMerchant"
                type="button"
                @click="goTo(5, 'back')"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Previous
              </button>
              <button
                v-else
                type="button"
                @click="backToFirstStep"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Previous
              </button>
              <button
                id="button5"
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                {{ existingMerchant ? "Submit" : "Next" }}
              </button>
            </div>
          </div>
        </form>
        <form
          id="form6"
          @submit.prevent="goTo(8, 'next')"
          v-if="!existingMerchant"
        >
          <div
            class="shadow overflow-hidden sm:rounded-md"
            v-if="currentStep == 6"
          >
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <!-- step 7 -->
                <div class="col-span-6">
                  <p class="text-base font-medium text-indigo-700">
                    Step 7 <span class="text-xs text-gray-500">/ 8</span> - Bank
                    Details
                  </p>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Bank Name</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.bankName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="state"
                    class="block text-sm font-medium text-gray-700"
                    >Account Number</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.bankAccountNumber"
                    v-maska="'#*'"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="state"
                    class="block text-sm font-medium text-gray-700"
                    >Account Type</label
                  >
                  <select
                    required
                    v-model="form.bankType"
                    class="
                      mt-1
                      block
                      w-full
                      py-2
                      px-3
                      border border-gray-300
                      bg-white
                      rounded-md
                      shadow-sm
                      focus:outline-none
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      sm:text-sm
                    "
                  >
                    <option value="checking">Checking Account</option>
                    <option value="savings">Savings Account</option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="postal_code"
                    class="block text-sm font-medium text-gray-700"
                    >Bank Account Routing Number</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.bankAccountRountingNumber"
                    v-maska="'#*'"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
              </div>
            </div>
            <div
              class="
                px-4
                py-3
                bg-gray-50
                text-right
                sm:px-6
                flex
                justify-between
              "
            >
              <button
                type="button"
                @click="goTo(6, 'back')"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Previous
              </button>
              <button
                id="button6"
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Next
              </button>
            </div>
          </div>
        </form>
        <form id="form7" @submit.prevent="submitForm" v-if="!existingMerchant">
          <div
            class="shadow overflow-hidden sm:rounded-md"
            v-if="currentStep == 7"
          >
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <!-- step 8 -->
                <div class="col-span-6">
                  <p class="text-base font-medium text-indigo-700">
                    Step 8 <span class="text-xs text-gray-500">/ 8</span> -
                    Sales Agent
                  </p>
                </div>
                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Sales Agent 1</label
                  >
                  <input
                    type="text"
                    v-model="form.salesAgent1"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Sales Agent 2</label
                  >
                  <input
                    type="text"
                    v-model="form.salesAgent2"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
              </div>
            </div>
            <div
              class="
                px-4
                py-3
                bg-gray-50
                text-right
                sm:px-6
                flex
                justify-between
              "
            >
              <button
                type="button"
                @click="goTo(7, 'back')"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Previous
              </button>
              <button
                id="button7"
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { maska } from "maska";
import moment from "moment-timezone";
import axios from "axios";
import { v4 } from "uuid";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { CheckIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
  Switch,
} from "@headlessui/vue";
import { required, email } from "vuelidate/lib/validators";
import { Money3Directive } from "v-money3";
import authHeader from "@/services/auth-header";
import SilaMoneyService from "../../services/silamoney.service";

const pages = [
  {
    name: "List of Cash Advance Applications",
    href: "/cash-advance-applications",
    current: false,
  },
  { name: "Create New Cash Advance Application", href: "#", current: true },
];

const businessEntities = [
  {
    name: "Corporation",
    description: "Company or group of people",
    value: "{ corporation: true}",
  },
  {
    name: "LLC",
    description:
      "Limited Liability Company, business structure that can hold assets",
    value: "{ llc: true}",
  },
  {
    name: "Partnership",
    description: "Two or more individuals",
    value: "{ partnership: true}",
  },
  {
    name: "Limited Partnership",
    description:
      "Two or more individuals but the limited partners are only liable up to the amount of their investment.",
    value: "{ limitedPartnership: true}",
  },
  {
    name: "Limited Liability Partnership",
    description:
      "Partnership in which some or all partners have limited liabilities",
    value: "{ limitedLiabilityPartnership: true}",
  },
  {
    name: "Sole Proprietorship",
    description: "Owned and controlled by an individual",
    value: "{ soleProprietorship: true}",
  },
  {
    name: "Others",
    description: "Please select here to type for other business entities",
    value: "{ others: true}",
  },
];

export default {
  directives: { maska, money3: Money3Directive },
  components: {
    Breadcrumbs,
    CheckIcon,
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
    Switch,
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
  setup() {
    const selected = ref(businessEntities[0]);
    const isStateIssued = ref(false);
    const hasMultipleLocation = ref(false);
    const showLicenseFields = ref(false);
    const showMultipleFields = ref(false);
    const isSameAdrress = ref(false);
    const currentStep = ref(0);
    const picker = ref([]);

    return {
      currentStep,
      pages,
      businessEntities,
      selected,
      isStateIssued,
      hasMultipleLocation,
      showLicenseFields,
      showMultipleFields,
      isSameAdrress,
      picker,
    };
  },
  data() {
    return {
      form: {
        email: "",
        paymentFrequency: "daily",
        country: "United States of America",
        physical_country: "United States of America",
        bankType: "checking",
        principalAmount: null,
        numberOfDays: 0,
        originationFeeAmount: 0,
        disbursedAmount: 0,
      },
      silaFirstName: "",
      silaLastName: "",
      primaryOwner: 0,
      submitBtn: false,
      states: null,
      new_merchant: null,
      existingMerchant: false,
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "$ ",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
      percentage4: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: " factor rate",
        precision: 4,
        masked: false,
      },
      percentage2: {
        decimal: ".",
        thousands: ",",
        prefix: " ",
        suffix: "%",
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
      steps: [
        {
          name: "Merchant Verification",
          description: "Verify merchant's email if existing.",
          href: "#",
          status: "current",
        },
        {
          name: "Merchant information",
          description: "Details about the merchant.",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Merchant Address",
          description: "Location where the merchant is located.",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Business Entity",
          description: "Choose what type of business this merchant belongs to.",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Business Information",
          description: "All about the business legal information.",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Cash Advance Details",
          description: "Apply for cash advance here.",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Bank Details",
          description: "Enter your bank details where we can deduct payments.",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Sales Agent",
          description: "Enter your agents here.",
          href: "#",
          status: "upcoming",
        },
      ],
    };
  },
  created() {
    this.moment = moment;
    var date = new Date();
    date.setDate(date.getDate() + 1);
    this.form.startDate = new Date(date)
      .toISOString()
      .slice(0, 10)
      .toLocaleString("en-US", { timeZone: "America/New_York" });

    if (localStorage.merchantEmail)
      this.searchMerchantEmail(localStorage.merchantEmail);
  },
  watch: {
    "form.factorRate": function(factorRate) {
      if (this.form.principalAmount)
        this.form.paybackAmount = (
          factorRate.replace(/[^0-9.]/g, "") *
          this.form.principalAmount.replace(/[^0-9.]/g, "")
        ).toFixed(2);
    },
    "form.originationFee": function(originationFee) {
      console.log(originationFee, this.form.principalAmount);
      if (this.form.principalAmount) {
        this.form.originationFeeAmount = (
          (originationFee.replace(/[^0-9.]/g, "") / 100) *
          this.form.principalAmount.replace(/[^0-9.]/g, "")
        ).toFixed(2);
        this.form.disbursedAmount = (
          this.form.principalAmount.replace(/[^0-9.]/g, "") -
          this.form.originationFeeAmount.replace(/[^0-9.]/g, "")
        ).toFixed(2);
      }
    },
    "form.endDate": function() {
      if (this.form.startDate) {
        this.form.numberOfDays = moment(this.form.endDate)
          .add(1, "days")
          .diff(moment(this.form.startDate), "days");
      }
    },
    "form.startDate": function(startDate) {
      var date = new Date(startDate);
      date.setDate(date.getDate() + 1);
      this.form.endDate = new Date(date).toISOString().slice(0, 10);
    },
  },
  computed: {
    getStartDate() {
      var date = new Date(this.form.startDate);
      date.setDate(date.getDate() + 1);
      return new Date(date).toISOString().slice(0, 10);
    },
    setStartDate() {
      var date = new Date();
      date.setDate(date.getDate() + 1);
      return new Date(date).toISOString().slice(0, 10);
    },
    checkSubmitLink() {
      return this.existingMerchant ? this.submitForm : this.goTo(7, "next");
    },
  },
  methods: {
    selectBirthDate(event) {
      let year = moment().diff(event.target.value, "years");
      if (year >= 18) return;

      /**Show error */
      Swal.fire({
        title: "Oops! Must be at least 18 years old.",
        text: "Please enter a valid birth date.",
        icon: "error",
      });
      this.form.birthDate = "";
    },
    async searchMerchantEmail(email) {
      axios
        .get(process.env.VUE_APP_API_URL + `/merchants?`, {
          headers: authHeader(),
        })
        .then((response) => {
          var merchant = response.data.data.filter(function(merchant_row) {
            if (merchant_row.merchantInformation.email == email) {
              return merchant_row;
            }
          });
          if (merchant.length != 0) {
            this.showNotif(
              "Verified",
              "The merchant email is existing in our records",
              "success",
              false,
              1500
            );
            localStorage.removeItem("merchantEmail");
            this.currentStep = 0;
            this.steps[0].status = "complete";
            this.steps[1].status = "complete";
            this.steps[2].status = "complete";
            this.steps[3].status = "complete";
            this.steps[4].status = "complete";
            this.existingMerchant = true;
            this.new_merchant = merchant[0].merchantInformation.id;
            this.form.bankName = merchant[0].merchantInformation.bankName;
            this.form.bankAccountNumber =
              merchant[0].merchantInformation.bankAccountNumber;
            this.form.bankType = merchant[0].merchantInformation.bankType
              .toLowerCase()
              .trim();
            this.form.bankAccountRountingNumber =
              merchant[0].merchantInformation.bankAccountRountingNumber;
            this.form.salesAgent1 = merchant[0].merchantInformation.salesAgent1;
            this.form.salesAgent2 = merchant[0].merchantInformation.salesAgent2;
            this.goTo(5, "next");
          } else {
            if (this.submitBtn === false) {
              this.currentStep = 0;
              this.goTo(1, "next");
            }
            this.existingMerchant = false;
          }
        });
    },
    backToFirstStep() {
      this.currentStep = 0;
      this.steps[0].status = "current";
      this.steps[1].status = "upcoming";
      this.steps[2].status = "upcoming";
      this.steps[3].status = "upcoming";
      this.steps[4].status = "upcoming";
      this.steps[5].status = "upcoming";
      this.existingMerchant = false;
      this.new_merchant = null;
    },
    async createMerchant() {
      var data = {
        corporateAddress: {
          sameWithPhysicalId: this.isSameAdrress,
          streetAddress: this.form.physical_streetAddress,
          city: this.form.physical_city,
          state: this.form.physical_state,
          zipCode: this.form.physical_zipCode,
          country: this.form.physical_country,
          phoneNumber: this.form.physical_phoneNumber,
          faxNumber: this.form.physical_faxNumber,
        },
        physicalAddress: {
          streetAddress: this.form.streetAddress,
          city: this.form.city,
          state: this.form.state,
          zipCode: this.form.zipCode,
          country: this.form.country,
          phoneNumber: this.form.phoneNumber,
          faxNumber: this.form.faxNumber,
        },
        businessInformation: {
          owner1FirstName: this.form.owner1FirstName,
          owner1LastName: this.form.owner1LastName,
          owner2FirstName: this.form.owner2FirstName,
          owner2LastName: this.form.owner2LastName,
          birthDate: this.form.birthDate,
          title: this.form.title,
          primaryContactName: this.form.primaryContactName,
          idNumber: this.form.idNumber,
          tinType: this.form.tinType,
          businessLicense: this.form.businessLicense,
          businessLicenseState: this.form.businessLicenseState,
          numberOfLocations: this.form.numberOfLocations,
          businessFormationDate: this.form.businessFormationDate,
        },
        merchantInformation: {
          name: this.form.name,
          email: this.form.email,
          businessName: this.form.businessName,
          businessEntity: JSON.stringify(this.form.business_entity),
          bankName: this.form.bankName,
          bankAccountNumber: this.form.bankAccountNumber,
          bankAccountRountingNumber: this.form.bankAccountRountingNumber,
          bankType: this.form.bankType,
          salesAgent1: this.form.salesAgent1,
          salesAgent2: this.form.salesAgent2,
        },
      };
      console.log(JSON.stringify(data));

      axios
        .post(process.env.VUE_APP_API_URL + `/merchants`, data, {
          headers: authHeader(),
        })
        .then(async (response) => {
          console.log(response);
          this.new_merchant = response.data.data.merchantInformation.id;
          console.log(this.new_merchant);
          await this.createSilaMerchant(this.new_merchant);
        })
        .catch(function(error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response);
            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
            let listOfObjects = Object.keys(error.response.data.errors).map(
              (key) => {
                return error.response.data.errors[key];
              }
            );
            console.log("error", listOfObjects);
            Swal.fire({
              title: "Oops! Something went wrong.",
              text: listOfObjects[0],
              icon: "error",
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error);
          }
        });
    },
    async createSilaMerchant(id) {
      const referenceNumber = v4().split("-")[0];

      let merchantData = {
        handle: `user.paybotic.${referenceNumber}`,
        firstName: this.silaFirstName,
        lastName: this.silaLastName,
        address: this.form.streetAddress,
        city: this.form.city,
        state: this.form.state,
        zip: this.form.zipCode,
        phone: this.form.phoneNumber,
        email: this.form.email,
        dateOfBirth: this.form.birthDate,
        ssn: this.form.idNumber,
      };
      await axios
        .post(
          process.env.VUE_APP_SILAMONEY_URL + `/entities/individual-user`,
          merchantData
        )
        .then(async (res) => {
          console.log(res);
          await this.requestSilaKYC(merchantData.handle, id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async requestSilaKYC() {
      // this._silaMoneyService.requestKYC(userHandle,id)
      //  SilaMoneyService.requestKYC(userHandle, id);
      SilaMoneyService.requestKYC("user.ali.paybotic49c05406", 12);
    },
    async submitApplication() {
      var data = {
        merchantId: this.new_merchant,
        principalAmount: this.form.principalAmount.replace(/[^0-9.]/g, "") ?? 0,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        paymentFrequency: this.form.paymentFrequency,
        factorRate: this.form.factorRate.replace(/[^0-9.]/g, ""),
        originationFee: this.form.originationFee.replace(/[^0-9.]/g, ""),
        repaymentType: this.form.repaymentType,
        witholdingPercentage: this.form.withHoldingPercentage
          ? (
              this.form.withHoldingPercentage.replace(/[^0-9.]/g, "") / 100
            ).toFixed(4)
          : 0.0,
      };
      console.log(data);
      axios
        .post(
          process.env.VUE_APP_API_URL + `/cash-advance-applications`,
          data,
          { headers: authHeader() }
        )
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "Congratulations",
            icon: "success",
            text: "You have successfully applied for a cash advance.",
            showDenyButton: true,
            allowOutsideClick: false,
            confirmButtonText: `Create again`,
            denyButtonText: `Go to Cash Advance Applications`,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/cash-advance-applications/create";
            } else if (result.isDenied) {
              window.location.href = "/cash-advance-applications";
            }
          });
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(
              error.response.data.errors[0].message ??
                error.response.data.errors
            );
            Swal.fire({
              title: "Oops! Something went wrong.",
              text: error.response.data.errors[0].message ?? "",
              icon: "error",
            });
          } else if (error.request) {
            console.log(error.request);
            Swal.fire({
              title: "Oops! Something went wrong.",
              text: error.request,
              icon: "error",
            });
          } else {
            console.log("Error", error.message);
            Swal.fire({
              title: "Oops! Something went wrong.",
              text: error.message,
              icon: "error",
            });
          }
        });
    },

    submitForm() {
      if (this.existingMerchant) this.submitApplication();
      else {
        this.submitBtn = true;
        this.searchMerchantEmail(this.form.email);
        if (this.existingMerchant) this.submitApplication();
        else this.createMerchant();
      }
    },
    goTo(id, btn) {
      if (id != 5 || (id == 5 && btn == "back")) {
        if (btn == "back") {
          this.steps[this.currentStep].status = "upcoming";
          if (this.currentStep !== 0) this.currentStep -= 1;
          this.steps[this.currentStep].status = "current";
        } else {
          this.steps[this.currentStep].status = "complete";
          this.currentStep += 1;
          this.steps[this.currentStep].status = "current";
        }
      } else {
        this.currentStep = id;
        this.steps[this.currentStep].status = "current";
      }
    },
    stepperClick(id) {
      for (let i = 0; i < this.steps.length; i++) {
        if (i < id) this.steps[i].status = "complete";
        else if (i === id) this.steps[i].status = "current";
        else this.steps[i].status = "upcoming";
      }
      this.currentStep = id;
    },
    updateTinType(type) {
      this.form.tinType = type;
    },
    populatePrimaryContact(number) {
      if (number == 1) {
        if (this.primaryOwner == 1) {
          this.primaryOwner = 0;
          this.form.primaryContactName = "";
        } else {
          this.form.primaryContactName =
            this.form.owner1FirstName + " " + this.form.owner1LastName;
          this.form.markOwner2AsPrimaryContact = null;
          this.silaFirstName = this.form.owner1FirstName;
          this.silaLastName = this.form.owner1LastName;
          this.primaryOwner = 1;
        }
      } else {
        if (this.primaryOwner == 2) {
          this.primaryOwner = 0;
          this.form.primaryContactName = "";
        } else {
          this.form.primaryContactName =
            this.form.owner2FirstName + " " + this.form.owner2LastName;
          this.form.markOwner1AsPrimaryContact = null;
          this.silaFirstName = this.form.owner2FirstName;
          this.silaLastName = this.form.owner2LastName;
          this.primaryOwner = 2;
        }
      }
      console.log(this.silaFirstName, this.silaLastName);
    },
    formatCurrency(value) {
      if (!value) {
        this.form.principalAmount = null;
        return;
      }
      value = value.replace(/[^0-9.]/g, "");
      const number = (value / 1).toFixed(2).replace(",", ".");
      this.form.principalAmount =
        "$ " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (this.form.factorRate)
        this.form.paybackAmount = (
          this.form.principalAmount.replace(/[^0-9.]/g, "") *
          this.form.factorRate.replace(/[^0-9.]/g, "")
        ).toFixed(2);

      if (this.form.originationFee) {
        this.form.originationFeeAmount = (
          this.form.principalAmount.replace(/[^0-9.]/g, "") *
          (this.form.originationFee.replace(/[^0-9.]/g, "") / 100)
        ).toFixed(2);
        this.form.disbursedAmount = (
          this.form.principalAmount.replace(/[^0-9.]/g, "") -
          this.form.originationFeeAmount.replace(/[^0-9.]/g, "")
        ).toFixed(2);
        console.log("disbursedAmount", this.form.disbursedAmount);
      }
    },
    clearfield() {
      this.form.principalAmount = null;
    },
    showNotif(title, text, icon, showButton, timer) {
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showConfirmButton: showButton,
        timer: timer,
      });
    },
  },
};
</script>
