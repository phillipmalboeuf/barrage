import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAnswerFields {
    label: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    nextQuestion?: EntryFieldTypes.EntryLink<TypeFormSkeleton | TypeQuestionSkeleton>;
    error?: EntryFieldTypes.RichText;
}

export type TypeAnswerSkeleton = EntrySkeletonType<TypeAnswerFields, "answer">;
export type TypeAnswer<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAnswerSkeleton, Modifiers, Locales>;

export function isTypeAnswer<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAnswer<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'answer'
}

export interface TypeFormFields {
    id: EntryFieldTypes.Symbol;
    action: EntryFieldTypes.Symbol;
    introduction?: EntryFieldTypes.RichText;
    inputs?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeInputSkeleton>>;
    successMessage?: EntryFieldTypes.RichText;
}

export type TypeFormSkeleton = EntrySkeletonType<TypeFormFields, "form">;
export type TypeForm<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeFormSkeleton, Modifiers, Locales>;

export function isTypeForm<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeForm<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'form'
}

export interface TypeGridFields {
    title?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    columns?: EntryFieldTypes.Integer;
    alignments?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    colors?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton | TypeTextSkeleton>>;
}

export type TypeGridSkeleton = EntrySkeletonType<TypeGridFields, "grid">;
export type TypeGrid<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeGridSkeleton, Modifiers, Locales>;

export function isTypeGrid<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeGrid<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'grid'
}

export interface TypeHeroFields {
    id?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
    media?: EntryFieldTypes.AssetLink;
    alignment?: EntryFieldTypes.Symbol<"Center" | "Left">;
}

export type TypeHeroSkeleton = EntrySkeletonType<TypeHeroFields, "hero">;
export type TypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHeroSkeleton, Modifiers, Locales>;

export function isTypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHero<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'hero'
}

export interface TypeInputFields {
    label: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    type: EntryFieldTypes.Symbol<"Email" | "Phone" | "Text" | "Textarea">;
}

export type TypeInputSkeleton = EntrySkeletonType<TypeInputFields, "input">;
export type TypeInput<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeInputSkeleton, Modifiers, Locales>;

export function isTypeInput<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeInput<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'input'
}

export interface TypeLinkFields {
    label: EntryFieldTypes.Symbol;
    destination?: EntryFieldTypes.Symbol;
    asset?: EntryFieldTypes.AssetLink;
    title?: EntryFieldTypes.Symbol;
    external?: EntryFieldTypes.Boolean;
}

export type TypeLinkSkeleton = EntrySkeletonType<TypeLinkFields, "link">;
export type TypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLinkSkeleton, Modifiers, Locales>;

export function isTypeLink<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLink<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'link'
}

export interface TypeListFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationSkeleton | TypeTeamMemberSkeleton | TypeTextSkeleton>>;
}

export type TypeListSkeleton = EntrySkeletonType<TypeListFields, "list">;
export type TypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeListSkeleton, Modifiers, Locales>;

export function isTypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeList<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'list'
}

export interface TypeNavigationFields {
    title?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypePageFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeGridSkeleton | TypeHeroSkeleton | TypeListSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypeQuestionFields {
    body?: EntryFieldTypes.RichText;
    id: EntryFieldTypes.Symbol;
    answers?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAnswerSkeleton>>;
    defaultNextQuestion?: EntryFieldTypes.EntryLink<TypeFormSkeleton | TypeQuestionSkeleton>;
}

export type TypeQuestionSkeleton = EntrySkeletonType<TypeQuestionFields, "question">;
export type TypeQuestion<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeQuestionSkeleton, Modifiers, Locales>;

export function isTypeQuestion<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeQuestion<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'question'
}

export interface TypeTeamMemberFields {
    name: EntryFieldTypes.Symbol;
    qualifications?: EntryFieldTypes.Symbol;
    jobTitle?: EntryFieldTypes.Symbol;
    portrait?: EntryFieldTypes.AssetLink;
    bio?: EntryFieldTypes.RichText;
}

export type TypeTeamMemberSkeleton = EntrySkeletonType<TypeTeamMemberFields, "teamMember">;
export type TypeTeamMember<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTeamMemberSkeleton, Modifiers, Locales>;

export function isTypeTeamMember<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeTeamMember<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'teamMember'
}

export interface TypeTextFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
    media?: EntryFieldTypes.AssetLink;
    mediaAlignment?: EntryFieldTypes.Symbol<"Fixed" | "Left" | "Right">;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}
